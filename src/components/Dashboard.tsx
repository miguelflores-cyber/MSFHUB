import { ClipboardList, Calendar, Headphones, BookOpen, Clock, ChevronRight, CheckSquare, Square, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { ActiveTab, Environment, Task, AcademicClass } from '../types';

interface DashboardProps {
  environment: Environment;
  setActiveTab: (tab: ActiveTab) => void;
  ceubTasks: Task[];
  cilTasks: Task[];
  onToggleTaskCompletion: (taskId: string) => void;
  cilClasses: AcademicClass[];
  studentName: string;
}

export default function Dashboard({
  environment,
  setActiveTab,
  ceubTasks,
  cilTasks,
  onToggleTaskCompletion,
  cilClasses,
  studentName,
}: DashboardProps) {
  const isCEUB = environment === 'CEUB';

  // Math counts
  const pendingCeubCount = ceubTasks.filter((t) => !t.completed).length;
  const pendingCilCount = cilTasks.filter((t) => !t.completed).length;

  const currentTheme = isCEUB ? 'CEUB' : 'CIL';

  return (
    <div id="dashboard-tab-content" className="space-y-8 animate-fade-in">
      
      {/* ----------------- CEUB UNIVERSITY DASHBOARD ----------------- */}
      {isCEUB && (
        <div id="ceub-dashboard" className="space-y-8">
          {/* Hero Section */}
          <section
            id="ceub-hero"
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 rounded-3xl bg-slate-900/40 border border-purple-500/10 relative overflow-hidden"
          >
            {/* Background glowing gradients */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            
            <div className="max-w-xl space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Bem-vindo ao <span id="portal-span" className="text-purple-400 bg-clip-text">CEUB</span>,
                <br />
                <span className="text-slate-200 text-3xl font-extrabold">{studentName}</span>
              </h1>
              <p className="text-slate-400 text-base font-medium leading-relaxed">
                Organize suas atividades e compromissos acadêmicos com precisão.
              </p>
            </div>

            {/* Official CEUB Logo extracted from user HTML design snippet */}
            <div id="ceub-logo-badge" className="hidden md:block w-36 py-2 px-4 rounded-2xl bg-slate-950/40 border border-purple-500/20 backdrop-blur-md">
              <img
                alt="Logo CEUB"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgxTimDpBU0iBVFusdw3YAkijS14q-PDP-rsR9-uaoG0HJ_tnVeTyZQ-o2vjGudOwVayq3cVF8glZ5h5_iadxSg_imTIryl19sEkfdLpjVumiHIaZmg_9upicvGTEFpv4cFmBoo7pepqtqtbH-ICK-DStrajZ5WuqDyk4i0KEbZkwr339MkCxzqoDyj8SQMOTxwRFsGSodk88ksweK9dKcAD-RVeGzpIuTjTtULA3SS_lT-aSsVuzRM-yyC96ix4gduPufkc-KsC9G"
              />
            </div>
          </section>

          {/* Quick Action Bento Cards */}
          <section id="ceub-bento-cards" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Tarefas */}
            <div
              id="ceub-bento-tarefas"
              onClick={() => setActiveTab('tarefas')}
              className="group relative bg-[#171f33]/90 hover:bg-[#1e2943] cursor-pointer rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500/40 transition-all duration-300 shadow-md flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-115 transition-transform">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <span className="text-xs bg-purple-950/60 border border-purple-500/20 text-purple-300 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  CEUB Geral
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Tarefas Acadêmicas
                </h3>
                <p className="text-sm text-slate-400">
                  {pendingCeubCount === 0
                    ? 'Nenhuma pendência ativa para esta semana! Bom trabalho.'
                    : `${pendingCeubCount} pendente${pendingCeubCount > 1 ? 's' : ''} esta semana.`}
                </p>

                {/* Micro preview of pending CEUB items */}
                {ceubTasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="flex items-center gap-2 mt-4 text-xs text-slate-400/80">
                    <span className={`w-1.5 h-1.5 rounded-full ${task.priority === 'ALTA' ? 'bg-rose-500' : 'bg-blue-400'}`} />
                    <span className="font-semibold truncate">{task.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Calendário */}
            <div
              id="ceub-bento-calendario"
              onClick={() => setActiveTab('calendario')}
              className="group relative bg-[#171f33]/90 hover:bg-[#1e2943] cursor-pointer rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500/40 transition-all duration-300 shadow-md flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-115 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs bg-purple-950/60 border border-purple-500/20 text-purple-300 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Outubro 2023
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Calendário Acadêmico
                </h3>
                <p className="text-sm text-slate-400">
                  Acompanhe datas de provas, trabalhos pontuados e feriados.
                </p>

                {/* Dummy indicator */}
                <span className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-bold mt-2 hover:underline">
                  Ver compromissos <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ----------------- CIL LANGUAGES DASHBOARD ----------------- */}
      {!isCEUB && (
        <div id="cil-dashboard" className="space-y-8">
          {/* Welcome Header */}
          <section id="cil-hero" className="max-w-3xl">
            <h1 className="text-4xl font-extrabold text-[#003e6f] tracking-tight">
              Bem-vindo ao <span className="text-[#005696] underline decoration-amber-400 decoration-3 leading-relaxed">CIL</span>,{' '}
              <span className="text-slate-800">{studentName}</span>
            </h1>
            <p className="text-slate-500 text-lg mt-1 font-medium">
              Organize seus estudos de idiomas e compromissos acadêmicos.
            </p>
          </section>

          {/* Quick Action Bento Column Layout */}
          <section id="cil-three-columns" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Col 1: Progresso circular */}
            <div
              id="cil-col-progresso"
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between items-center text-center relative overflow-hidden"
            >
              {/* Card Header label */}
              <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3 mb-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Progresso Acadêmico
                </span>
              </div>

              {/* Circle progress container */}
              <div id="cir-progress-svg" className="my-6 relative flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  {/* Gray background track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="64"
                    stroke="#eff4ff"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* Golden active track representing 75% */}
                  <circle
                    cx="80"
                    cy="80"
                    r="64"
                    stroke="#ffbb16"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 64}
                    strokeDashoffset={2 * Math.PI * 64 * (1 - 0.75)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute text-center">
                  <span className="text-4xl font-black text-[#003e6f] block">
                    75%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Concluído
                  </span>
                </div>
              </div>

              {/* Footer text */}
              <div className="mt-2 space-y-1">
                <h4 className="text-sm font-extrabold text-[#003e6f]">
                  Inglês Avançado
                </h4>
                <p className="text-xs text-slate-400 font-medium pb-2">
                  Módulo 4 em andamento
                </p>
              </div>
            </div>

            {/* Col 2: Tarefas Rápidas Checkboxes */}
            <div
              id="cil-col-tarefas-rapidas"
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5 text-blue-600" />
                    Tarefas Rápidas ({pendingCilCount} pendentes)
                  </span>
                </div>

                {/* Fully interactive list of tasks */}
                <div className="space-y-3.5">
                  {cilTasks.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">Sem tarefas de idiomas no banco.</p>
                  ) : (
                    cilTasks.slice(0, 3).map((task) => {
                      // pick icon based on words
                      let IconComponent = BookOpen;
                      if (task.title.toLowerCase().includes('listening')) {
                        IconComponent = Headphones;
                      }

                      return (
                        <div
                          key={task.id}
                          onClick={() => onToggleTaskCompletion(task.id)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.01]
                            ${
                              task.completed
                                ? 'bg-slate-50 border-slate-100 text-slate-400'
                                : 'bg-blue-50/20 border-blue-500/10 text-[#003e6f]'
                            }
                          `}
                        >
                          {/* Checked box display */}
                          <div className="mt-0.5 select-none" id={`check-click-${task.id}`}>
                            {task.completed ? (
                              <CheckSquare className="w-4.5 h-4.5 text-blue-600" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-[#003e6f]" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h5 className={`text-[13px] font-bold leading-snug ${task.completed ? 'line-through text-slate-400' : ''}`}>
                              {task.title}
                            </h5>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-medium">
                              <IconComponent className="w-3 h-3" />
                              {task.completed ? 'Concluído' : task.dueDate}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Complete board redirection */}
              <button
                onClick={() => setActiveTab('tarefas')}
                className="w-full mt-4 text-center text-xs font-bold text-blue-600 flex items-center justify-center gap-1 hover:underline"
              >
                <span>Ver Todas no Painel</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Col 3: Próximas Aulas (Timeline layout) */}
            <div
              id="cil-col-proximas-aulas"
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Próximas Aulas (Hoje)
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded uppercase tracking-wide">
                    Hoje
                  </span>
                </div>

                {/* Timeline items list */}
                <div className="relative pl-4 space-y-5 border-l border-slate-200 ml-1.5 py-2">
                  {cilClasses.map((cl, idx) => (
                    <div key={cl.id} className="relative group">
                      {/* Circle indicator on timeline line */}
                      <span className="absolute -left-[21.5px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-4 ring-slate-100 flex items-center justify-center animate-pulse" />

                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className="text-[13px] font-extrabold text-slate-800">
                            {cl.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-slate-400" />
                            {cl.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-rose-600 block">
                            {cl.time}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {cl.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Calendar access button */}
              <button
                onClick={() => setActiveTab('calendario')}
                className="w-full inline-flex md:flex justify-between items-center text-xs font-extrabold text-[#003e6f] bg-blue-50/70 hover:bg-blue-100/70 px-4 py-3 rounded-2xl transition-all"
              >
                <span>Acessar Calendário Completo</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            </div>

          </section>
        </div>
      )}

    </div>
  );
}
