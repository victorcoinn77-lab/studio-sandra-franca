import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { SERVICES, TIME_SLOTS } from '../types';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, User, Phone, Scissors, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const bookingSchema = z.object({
  clientName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  clientWhatsApp: z.string().min(10, 'WhatsApp inválido'),
  service: z.string().min(1, 'Selecione um serviço'),
  date: z.string().min(1, 'Selecione uma data'),
  time: z.string().min(1, 'Selecione um horário'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onBack: () => void;
}

export default function BookingForm({ onBack }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Check for duplicates
      const q = query(
        collection(db, 'appointments'),
        where('date', '==', data.date),
        where('time', '==', data.time),
        where('status', '!=', 'cancelled')
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error('Este horário já está reservado. Por favor, escolha outro.');
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'appointments'), {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      setIsSuccess(true);
      toast.success('Agendamento solicitado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar agendamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-[#D4AF37]/20 p-8 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Agendamento Solicitado!</h2>
        <p className="text-gray-600 mb-8">
          Sandra França entrará em contato via WhatsApp para confirmar seu horário.
        </p>
        <button
          onClick={onBack}
          className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all"
        >
          VOLTAR PARA O INÍCIO
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-3xl shadow-2xl border border-[#D4AF37]/20 overflow-hidden grid md:grid-cols-5">
        <div className="md:col-span-2 bg-black p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-serif mb-4">Reserve seu <br /><span className="text-[#D4AF37]">Momento</span></h2>
            <p className="text-white/60 mb-8">Escolha o melhor horário para cuidar da sua beleza com Sandra França.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <Scissors size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Serviços Premium</p>
                  <p className="text-sm">Alongamento & Cutícula Russa</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Atendimento</p>
                  <p className="text-sm">Segunda a Sábado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
            <p className="text-xs text-[#D4AF37] font-bold mb-1 uppercase">Dúvidas?</p>
            <p className="text-sm text-white/80">Fale direto no WhatsApp:</p>
            <p className="text-lg font-bold text-[#D4AF37]">62 98464-7958</p>
          </div>
        </div>

        <div className="md:col-span-3 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <User size={14} /> Nome Completo
                </label>
                <input
                  {...register('clientName')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  placeholder="Seu nome"
                />
                {errors.clientName && <p className="text-red-500 text-xs">{errors.clientName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <Phone size={14} /> WhatsApp
                </label>
                <input
                  {...register('clientWhatsApp')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  placeholder="(00) 00000-0000"
                />
                {errors.clientWhatsApp && <p className="text-red-500 text-xs">{errors.clientWhatsApp.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Scissors size={14} /> Serviço Desejado
              </label>
              <select
                {...register('service')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all bg-white"
              >
                <option value="">Selecione um serviço</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.service && <p className="text-red-500 text-xs">{errors.service.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <CalendarIcon size={14} /> Data
                </label>
                <input
                  type="date"
                  {...register('date')}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                />
                {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <Clock size={14} /> Horário
                </label>
                <select
                  {...register('time')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all bg-white"
                >
                  <option value="">Selecione um horário</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            >
              {isSubmitting ? 'PROCESSANDO...' : 'CONFIRMAR AGENDAMENTO'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
