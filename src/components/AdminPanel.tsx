import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Appointment, TIME_SLOTS } from '../types';
import { toast } from 'sonner';
import { Calendar, Clock, User, Phone, Scissors, Trash2, Check, X, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('date', 'desc'), orderBy('time', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
      toast.success(`Agendamento ${status === 'confirmed' ? 'confirmado' : 'cancelado'}.`);
    } catch (error) {
      toast.error('Erro ao atualizar status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) return;
    try {
      await deleteDoc(doc(db, 'appointments', id));
      toast.success('Agendamento excluído.');
    } catch (error) {
      toast.error('Erro ao excluir.');
    }
  };

  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleReschedule = async () => {
    if (!reschedulingId || !newDate || !newTime) return;
    try {
      await updateDoc(doc(db, 'appointments', reschedulingId), {
        date: newDate,
        time: newTime,
        status: 'pending'
      });
      toast.success('Agendamento remarcado com sucesso.');
      setReschedulingId(null);
    } catch (error) {
      toast.error('Erro ao remarcar.');
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = filter === 'all' || app.status === filter;
    
    if (viewMode === 'day') {
      return matchesStatus && app.date === format(viewDate, 'yyyy-MM-dd');
    } else if (viewMode === 'week') {
      const start = startOfWeek(viewDate);
      const end = endOfWeek(viewDate);
      const appDate = new Date(app.date + 'T00:00:00');
      return matchesStatus && appDate >= start && appDate <= end;
    } else {
      const start = startOfMonth(viewDate);
      const end = endOfMonth(viewDate);
      const appDate = new Date(app.date + 'T00:00:00');
      return matchesStatus && appDate >= start && appDate <= end;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif mb-2">Agenda <span className="text-[#D4AF37]">Privada</span></h1>
          <p className="text-gray-500">Gerencie seus atendimentos e horários.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['day', 'week', 'month'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === mode ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : 'Mês'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
            <button onClick={() => setViewDate(subDays(viewDate, viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 30))} className="p-1 hover:bg-white rounded-lg transition-all">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-bold min-w-[120px] text-center">
              {format(viewDate, viewMode === 'day' ? "dd 'de' MMMM" : viewMode === 'week' ? "'Semana de' dd/MM" : "MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <button onClick={() => setViewDate(addDays(viewDate, viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 30))} className="p-1 hover:bg-white rounded-lg transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <Filter size={14} /> Filtrar Status
            </h3>
            <div className="space-y-2">
              {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                    filter === s ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span className="capitalize">{s === 'all' ? 'Todos' : s === 'pending' ? 'Pendentes' : s === 'confirmed' ? 'Confirmados' : 'Cancelados'}</span>
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {appointments.filter(a => s === 'all' || a.status === s).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#D4AF37] p-6 rounded-3xl shadow-xl text-black">
            <h3 className="font-bold mb-2">Resumo de Hoje</h3>
            <p className="text-sm opacity-80 mb-4">Você tem {appointments.filter(a => a.date === format(new Date(), 'yyyy-MM-dd')).length} atendimentos hoje.</p>
            <div className="h-px bg-black/10 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Confirmados</span>
                <span className="font-bold">{appointments.filter(a => a.date === format(new Date(), 'yyyy-MM-dd') && a.status === 'confirmed').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pendentes</span>
                <span className="font-bold">{appointments.filter(a => a.date === format(new Date(), 'yyyy-MM-dd') && a.status === 'pending').length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-400">Nenhum agendamento encontrado</h3>
              <p className="text-gray-400 text-sm">Tente mudar o filtro ou a data de visualização.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAppointments.map((app) => (
                <div 
                  key={app.id} 
                  className={`bg-white p-6 rounded-3xl shadow-sm border-l-4 transition-all hover:shadow-md ${
                    app.status === 'confirmed' ? 'border-green-500' : 
                    app.status === 'cancelled' ? 'border-red-500' : 'border-[#D4AF37]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
                        <User size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{app.clientName}</h4>
                        <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Phone size={14} /> {app.clientWhatsApp}</span>
                          <span className="flex items-center gap-1"><Scissors size={14} /> {app.service}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-bold flex items-center justify-end gap-1"><Calendar size={14} /> {format(new Date(app.date + 'T00:00:00'), "dd 'de' MMM", { locale: ptBR })}</p>
                        <p className="text-xs text-gray-400 flex items-center justify-end gap-1"><Clock size={14} /> {app.time}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {app.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => {
                                setReschedulingId(app.id!);
                                setNewDate(app.date);
                                setNewTime(app.time);
                              }}
                              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                              title="Remarcar"
                            >
                              <Calendar size={20} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(app.id!, 'confirmed')}
                              className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all"
                              title="Confirmar"
                            >
                              <Check size={20} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(app.id!, 'cancelled')}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                              title="Cancelar"
                            >
                              <X size={20} />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleDelete(app.id!)}
                          className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all"
                          title="Excluir"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Reschedule Modal */}
      {reschedulingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#D4AF37]/20">
            <h3 className="text-2xl font-serif mb-6">Remarcar <span className="text-[#D4AF37]">Horário</span></h3>
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nova Data</label>
                <input 
                  type="date" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Novo Horário</label>
                <select 
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none bg-white"
                >
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setReschedulingId(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                CANCELAR
              </button>
              <button 
                onClick={handleReschedule}
                className="flex-1 py-3 bg-black text-white font-bold rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
