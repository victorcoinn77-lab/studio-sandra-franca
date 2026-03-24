import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold text-xl italic">
                SF
              </div>
              <h2 className="text-xl font-serif tracking-wider uppercase">
                Studio <span className="text-[#D4AF37]">Sandra França</span>
              </h2>
            </div>
            <p className="text-white/50 leading-relaxed">
              Especialista em nail design de luxo, focada em naturalidade, durabilidade e saúde das unhas.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
              <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
              <SocialIcon icon={<MessageCircle size={20} />} href="https://wa.me/5562984647958" />
            </div>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-8">Serviços</h3>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Alongamento de Unhas</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Cutícula Russa</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Manutenção</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Banho de Gel</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-8">Cursos</h3>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Formação Iniciante</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Aperfeiçoamento</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Mentoria Online</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Workshop Presencial</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-8">Contato</h3>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37]" />
                <span>62 98464-7958</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37]" />
                <span>contato@sandrafranca.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] mt-1" />
                <span>Goiânia, Goiás - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
          <p>© {currentYear} Studio Sandra França. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/5562984647958?text=Olá,%20gostaria%20de%20agendar%20um%20horário."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={32} />
      </a>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
    >
      {icon}
    </a>
  );
}
