
import React, { useState, useMemo, useRef } from 'react';
import { UserStats } from '../types';

interface PremiumViewProps {
  userStats: UserStats;
}

const PREMIUM_PLATFORMS = [
  { id: 'sanarflix', title: 'Sanarflix', description: 'Ciclo Básico e Clínico completo.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600' },
  { id: 'medcurso', title: 'Medcurso', description: 'Preparatório para Residência Médica.', image: 'https://images.unsplash.com/photo-1581594632702-52c1138395c5?auto=format&fit=crop&q=80&w=600' },
  { id: 'eumedico', title: 'Eu Médico Residente', description: 'Especialização e Prática Clínica.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600' },
  { id: 'estrategiamed', title: 'EstratégiaMED', description: 'Foco total em aprovação e revisões.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600' }
];

const SANARFLIX_THEMES = [
  "Anatomia do Sistema Locomotor", "Anatomia dos Órgãos e Sistemas", "Antibioticoterapia",
  "Atendimento Pré-Hospitalar", "Biofísica", "Biologia Molecular e Celular",
  "Bioquímica", "Eletrocardiograma (ECG)", "Embriologia", "Exames Laboratoriais",
  "Farmacologia", "Fisiologia", "Genética", "Histologia", "Microbiologia",
  "Neuroanatomia", "Parasitologia", "Patologia", "Primeiros Socorros",
  "Radiologia", "Semiologia", "Sistema Circulatório", "Sistema Digestório",
  "Sistema Endócrino", "Sistema Hematopoiético", "Sistema Imune", "Sistema Nervoso",
  "Sistema Reprodutor", "Sistema Respiratório", "Sistema Urinário e Renal", "Trauma"
];

const PremiumView: React.FC<PremiumViewProps> = ({ userStats }) => {
  const [showCourse, setShowCourse] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Vimeo API via postMessage
    if (videoRef.current?.contentWindow) {
      videoRef.current.contentWindow.postMessage(JSON.stringify({
        method: 'setVolume',
        value: newMutedState ? 0 : 1
      }), '*');
    }
  };

  const filteredThemes = useMemo(() => {
    return SANARFLIX_THEMES.filter(theme => 
      theme.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredPlatforms = useMemo(() => {
    return PREMIUM_PLATFORMS.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  if (!userStats.isPremium) {
    return (
      <div className="max-w-[1200px] mx-auto pt-6 md:pt-10 pb-32 px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 px-3 md:px-4 py-1.5 rounded-full mb-6 md:mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            <span className="text-blue-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Upgrade Disponível</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight md:leading-none px-4">
            Estude sem limites com o <span className="text-blue-600">Nexus Premium</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4">
            A ferramenta definitiva para quem leva a medicina a sério. Vá além das questões e domine o método PBL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 px-4">
          {[
            { title: "Questões Ilimitadas", desc: "Esqueça o limite diário. Pratique até a exaustão com nossa base completa.", icon: "∞" },
            { title: "Streaming Educacional", desc: "Acesso a cursos de revisão e masterclasses focadas em raciocínio clínico.", icon: "▶" },
            { title: "Materiais Exclusivos", desc: "Download de apostilas estruturadas para todos os módulos PBL.", icon: "📄" }
          ].map((feat, i) => (
            <div key={i} className="bg-neutral-900/30 border border-neutral-800 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:border-blue-600/30 transition-all group shadow-xl">
              <div className="text-3xl md:text-4xl text-blue-600 mb-6 font-bold opacity-50 group-hover:opacity-100 transition-opacity">{feat.icon}</div>
              <h3 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4 tracking-tight">{feat.title}</h3>
              <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 md:p-1.5 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-blue-600/20 mx-4">
          <div className="bg-[#0a0a0a] rounded-[2.3rem] md:rounded-[3.3rem] p-8 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
            <div className="w-full lg:max-w-xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Pronto para o próximo nível?</h2>
              <ul className="space-y-4 mb-8 md:mb-10 inline-block text-left">
                {["Acesso instantâneo a todos os ciclos", "Suporte prioritário via WhatsApp", "Ranking VIP de desempenho"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm md:text-base font-medium">
                    <div className="w-5 h-5 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black py-4 md:py-5 px-10 md:px-12 rounded-2xl transition-all shadow-xl shadow-blue-600/30 text-base md:text-lg uppercase tracking-widest active:scale-95">
                Assinar Agora
              </button>
            </div>
            <div className="hidden lg:flex w-64 h-64 md:w-80 md:h-80 bg-blue-600/5 rounded-full border border-blue-600/10 items-center justify-center relative">
               <div className="absolute inset-0 blur-[100px] bg-blue-600/20 rounded-full"></div>
               <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 pb-12 w-full">
      {/* Banner de Vídeo (Hero Section) */}
      {!showCourse && (
        <section className="relative w-full h-[60vh] md:h-[80vh] mb-12 overflow-hidden rounded-[1.5rem] md:rounded-[3rem] group">
          {/* Vídeo Background (Vimeo) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]">
            <iframe 
              ref={videoRef}
              src="https://player.vimeo.com/video/1155181147?autoplay=1&loop=1&muted=1&background=1&controls=0&badge=0&autopause=0&player_id=0&app_id=58479" 
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Banner Video"
            ></iframe>
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
          
          {/* Botão de Controle de Som */}
          <button 
            onClick={toggleMute}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/30 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all shadow-2xl"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a2 2 0 0 0-3.54-1.3l-3.32 3.32"/><path d="M3 13H5l4 4V10"/><path d="M15.54 10.76a2 2 0 0 1 0 2.48"/><path d="M19.07 14.29a5 5 0 0 0 0-4.58"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            )}
          </button>
          
          <div className="absolute left-6 md:left-16 bottom-10 md:bottom-20 max-w-2xl z-10 px-4 md:px-0">
            <span className="bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-4 inline-block">Série Premium</span>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter italic leading-none">
              Ciclo Básico Sanarflix
            </h1>
            <p className="text-neutral-300 text-sm md:text-xl font-light mb-8 leading-relaxed line-clamp-2 md:line-clamp-none">
              A base mais sólida para sua formação médica. Explore centenas de aulas organizadas pelos maiores especialistas do país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowCourse(true)}
                className="w-full sm:w-auto bg-white text-black font-black py-3 md:py-4 px-8 md:px-10 rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3 text-xs md:text-base group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Estudar
              </button>
              <button 
                onClick={() => setShowDetails(true)}
                className="w-full sm:w-auto bg-neutral-800/60 backdrop-blur-md text-white font-black py-3 md:py-4 px-8 md:px-10 rounded-xl hover:bg-neutral-700 transition-all border border-white/10 text-xs md:text-base flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Mais detalhes
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Course Catalog (Streaming Style) */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 mt-12">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-10 md:mb-12">
          <div>
            {showCourse && (
              <button onClick={() => setShowCourse(false)} className="mb-4 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">Voltar ao Menu Principal</span>
              </button>
            )}
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
              {showCourse ? "Ciclo Básico de Medicina – Sanarflix" : "Catálogo Premium"}
            </h2>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder={showCourse ? "Pesquisar tema no catálogo..." : "Pesquisar plataforma..."}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-10 md:px-12 text-xs md:text-sm text-white focus:border-blue-600 outline-none transition-all placeholder:text-neutral-700 shadow-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </header>

        {/* Grid de Cards Estilo Streaming */}
        {showCourse ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 animate-in fade-in duration-500">
            {filteredThemes.map((theme, index) => (
              <div 
                key={index} 
                className="group relative aspect-[2/3] md:aspect-video rounded-lg md:rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-all cursor-pointer shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                  <span className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">Sanarflix</span>
                  <h3 className="text-white font-bold text-xs md:text-base leading-tight group-hover:text-blue-400 transition-colors">
                    {theme}
                  </h3>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full w-0 group-hover:w-full bg-blue-600 transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 text-white scale-75 group-hover:scale-100 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-in fade-in duration-500">
            {filteredPlatforms.map((platform) => (
              <div 
                key={platform.id} 
                onClick={() => platform.id === 'sanarflix' && setShowCourse(true)}
                className="group relative aspect-video rounded-[2rem] overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-all cursor-pointer shadow-2xl"
              >
                <img src={platform.image} alt={platform.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-blue-500 transition-colors">{platform.title}</h3>
                   <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-4 group-hover:text-neutral-200 transition-colors">
                     {platform.description}
                   </p>
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-2 transition-transform inline-block">
                     {platform.id === 'sanarflix' ? 'Acessar Catálogo →' : 'Em breve'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowDetails(false)}></div>
           <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-fit max-h-[90vh]">
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-neutral-900 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" alt="Details" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                 </div>
              </div>
              <div className="p-8 md:p-12 flex-1 overflow-y-auto">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">Original Nexus Premium</span>
                       <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter italic">Sanarflix Pro</h2>
                    </div>
                    <button onClick={() => setShowDetails(false)} className="text-neutral-600 hover:text-white transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                 </div>
                 <div className="flex items-center gap-4 mb-8">
                    <span className="text-emerald-500 font-bold text-sm">98% Relevante</span>
                    <span className="px-1.5 py-0.5 border border-neutral-700 rounded text-[9px] font-bold text-neutral-400">18+</span>
                    <span className="text-neutral-500 text-sm font-medium">31 Módulos</span>
                 </div>
                 <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-10 italic">
                   "A experiência definitiva para estudantes de medicina. Mais de 30 temas fundamentais organizados de forma didática para você dominar do Ciclo Básico ao Internato. Conteúdo exclusivo com foco total na grade PBL."
                 </p>
                 <button 
                   onClick={() => { setShowCourse(true); setShowDetails(false); }}
                   className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl shadow-xl shadow-blue-600/20 text-sm uppercase tracking-widest transition-all"
                 >
                   Começar a Assistir
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PremiumView;
