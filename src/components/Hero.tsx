import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, Users } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

export default function Hero({ onBookingClick }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Nail Designer de Referência</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-6">
            Transformando <br />
            <span className="italic text-[#D4AF37]">Beleza em Arte</span>
          </h1>
          
          <p className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Especialista em Alongamento de Unhas e Cutícula Russa. 
            Mais de 10 mil procedimentos realizados com naturalidade e excelência.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBookingClick}
              className="group flex items-center justify-center gap-3 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#C5A028] transition-all transform hover:scale-105"
            >
              AGENDAR HORÁRIO
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-6 px-4 py-2">
              <div className="text-center">
                <p className="text-[#D4AF37] font-bold text-2xl">+10k</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">Procedimentos</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-[#D4AF37] font-bold text-2xl">100%</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">Naturalidade</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border-[10px] border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
            <img 
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800" 
              alt="Nail Art Studio" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-[#D4AF37]/30 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#D4AF37] p-2 rounded-lg">
                <Award size={20} className="text-black" />
              </div>
              <div>
                <p className="text-sm font-bold">Cutícula Russa</p>
                <p className="text-xs text-white/50">Técnica Exclusiva</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-[#D4AF37]/30 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#D4AF37] p-2 rounded-lg">
                <Users size={20} className="text-black" />
              </div>
              <div>
                <p className="text-sm font-bold">Cursos Profissionais</p>
                <p className="text-xs text-white/50">Formação Completa</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
