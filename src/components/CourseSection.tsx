import { motion } from 'motion/react';
import { GraduationCap, Video, Users, CheckCircle } from 'lucide-react';

export default function CourseSection() {
  const courses = [
    {
      title: "Formação Nail Designer Pro",
      type: "Presencial",
      description: "Do zero ao avançado. Aprenda as técnicas que me tornaram referência no mercado.",
      icon: <Users className="text-[#D4AF37]" />,
      features: ["Aulas Práticas", "Certificado", "Suporte VIP"]
    },
    {
      title: "Especialização Cutícula Russa",
      type: "Online",
      description: "Domine a técnica mais desejada pelas clientes e aumente seu faturamento.",
      icon: <Video className="text-[#D4AF37]" />,
      features: ["Acesso Vitalício", "HD Video", "Material Didático"]
    },
    {
      title: "Mentoria de Negócios",
      type: "Online/Presencial",
      description: "Como gerir seu estúdio e atrair clientes de alto valor todos os dias.",
      icon: <GraduationCap className="text-[#D4AF37]" />,
      features: ["Gestão Financeira", "Marketing", "Posicionamento"]
    }
  ];

  return (
    <section id="courses" className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Área de <span className="text-[#D4AF37]">Cursos</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            "Transformo iniciantes em nail designers de referência."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                {course.icon}
              </div>
              
              <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 w-fit">
                Curso {course.type}
              </div>

              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">{course.description}</p>

              <ul className="space-y-3 mb-8">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle size={16} className="text-[#D4AF37]" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all">
                SAIBA MAIS
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-12 bg-black rounded-[40px] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 blur-[100px]" />
          <h3 className="text-3xl font-serif mb-6 relative z-10">Pronta para elevar seu nível profissional?</h3>
          <p className="text-white/60 mb-10 max-w-xl mx-auto relative z-10">
            Junte-se a centenas de alunas que transformaram suas carreiras através das minhas metodologias exclusivas.
          </p>
          <button className="px-10 py-4 bg-[#D4AF37] text-black font-bold rounded-full hover:scale-105 transition-transform relative z-10">
            QUERO SER UMA REFERÊNCIA
          </button>
        </div>
      </div>
    </section>
  );
}
