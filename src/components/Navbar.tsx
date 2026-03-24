import { User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { cn } from '../lib/utils';
import { LogIn, LogOut, Calendar, LayoutDashboard, GraduationCap, Home } from 'lucide-react';
import { toast } from 'sonner';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  user: User | null;
  isAdmin: boolean;
}

export default function Navbar({ currentView, setView, user, isAdmin }: NavbarProps) {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer login.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setView('home');
      toast.success('Sessão encerrada.');
    } catch (error) {
      toast.error('Erro ao sair.');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#D4AF37]/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold text-xl italic">
            SF
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-serif text-lg leading-tight tracking-wider uppercase">
              Studio <span className="text-[#D4AF37]">Sandra França</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          <NavButton 
            active={currentView === 'home'} 
            onClick={() => setView('home')}
            icon={<Home size={18} />}
            label="Início"
          />
          <NavButton 
            active={currentView === 'booking'} 
            onClick={() => setView('booking')}
            icon={<Calendar size={18} />}
            label="Agendar"
          />
          <NavButton 
            active={currentView === 'courses'} 
            onClick={() => setView('courses')}
            icon={<GraduationCap size={18} />}
            label="Cursos"
          />
          
          {isAdmin && (
            <NavButton 
              active={currentView === 'admin'} 
              onClick={() => setView('admin')}
              icon={<LayoutDashboard size={18} />}
              label="Painel"
              className="text-[#D4AF37] border-[#D4AF37]/30"
            />
          )}

          <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

          {user ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37] text-black font-semibold hover:bg-[#C5A028] transition-all text-sm"
            >
              <LogIn size={16} />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavButton({ active, onClick, icon, label, className }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-sm",
        active 
          ? "bg-white/10 text-[#D4AF37] font-medium" 
          : "text-white/60 hover:text-white hover:bg-white/5",
        className
      )}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
