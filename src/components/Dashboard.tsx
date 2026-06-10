import { ClipboardList, Calendar, Headphones, BookOpen, Clock, ChevronRight, CheckSquare, Square, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { ActiveTab, Environment, Task, AcademicClass, StudentProfile } from '../types';

interface DashboardProps {
  environment: Environment;
  setActiveTab: (tab: ActiveTab) => void;
  ceubTasks: Task[];
  cilTasks: Task[];
  onToggleTaskCompletion: (taskId: string) => void;
  cilClasses: AcademicClass[];
  studentName: string;
  profile: StudentProfile;
}

export default function Dashboard({
  environment,
  setActiveTab,
  ceubTasks,
  cilTasks,
  onToggleTaskCompletion,
  cilClasses,
  studentName,
  profile,
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
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 rounded-2xl bg-[#1E1535] border border-[#7C5CBF]/25 relative overflow-hidden"
          >
            {/* Background glowing gradients */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            
            <div className="max-w-xl space-y-2">
              <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-none font-display">
                Bem-vindo ao <span id="portal-span" className="text-purple-300 font-extrabold font-display">CEUB</span>,
                <br />
                <span className="text-white text-3xl md:text-4xl font-extrabold tracking-tight block mt-1.5 font-brand">{studentName}</span>
              </h1>
              <p className="text-slate-400 text-[14px] font-normal leading-relaxed">
                Organize suas atividades e compromissos acadêmicos com precisão.
              </p>
            </div>

            {/* Official CEUB Logo extracted from user HTML design snippet */}
            <div id="ceub-logo-badge" className="hidden md:block w-36">
              <img
                alt="Logo CEUB"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain"
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
              className="group relative bg-[#1E1535] hover:bg-[#251A42] cursor-pointer rounded-xl p-6 border border-[#7C5CBF]/25 hover:border-[#7C5CBF]/40 transition-all duration-300 shadow-sm flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="text-purple-300">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-purple-300/60 font-medium uppercase tracking-wider">
                  CEUB Geral
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-[15px] font-medium text-white group-hover:text-purple-300 transition-colors">
                  Tarefas Acadêmicas
                </h3>
                <p className="text-[14px] text-slate-400 font-normal">
                  {pendingCeubCount === 0
                    ? 'Nenhuma pendência ativa para esta semana! Bom trabalho.'
                    : `${pendingCeubCount} pendente${pendingCeubCount > 1 ? 's' : ''} esta semana.`}
                </p>

                {/* Micro preview of pending CEUB items */}
                {ceubTasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="flex items-center gap-2 mt-4 text-[13px] text-slate-400/80">
                    <span className={`w-1.5 h-1.5 rounded-full ${task.priority === 'ALTA' ? 'bg-rose-500' : 'bg-blue-400'}`} />
                    <span className="font-normal truncate">{task.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Calendário */}
            <div
              id="ceub-bento-calendario"
              onClick={() => setActiveTab('calendario')}
              className="group relative bg-[#1E1535] hover:bg-[#251A42] cursor-pointer rounded-xl p-6 border border-[#7C5CBF]/25 hover:border-[#7C5CBF]/40 transition-all duration-300 shadow-sm flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="text-purple-300">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-purple-300/60 font-medium uppercase tracking-wider">
                  Outubro 2023
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-[15px] font-medium text-white group-hover:text-purple-300 transition-colors">
                  Calendário Acadêmico
                </h3>
                <p className="text-[14px] text-slate-400 font-normal">
                  Acompanhe datas de provas, trabalhos pontuados e feriados.
                </p>

                {/* Dummy indicator */}
                <span className="inline-flex items-center gap-1 text-[13px] text-purple-300/85 font-medium mt-2 hover:underline">
                  Ver compromissos <ChevronRight className="w-3 h-3" />
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
          <section
            id="cil-hero"
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 rounded-2xl bg-white border border-[#E2E8F0] relative overflow-hidden shadow-sm w-full"
          >
            {/* Background glowing gradients */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-[#1A56B0]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="max-w-xl space-y-2">
              <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-slate-700 leading-none font-display">
                Bem-vindo ao <span id="cil-welcome-span" className="text-[#1A56B0] font-extrabold font-display">CIL</span>,
                <br />
                <span className="text-[#1A56B0] text-3xl md:text-4xl font-extrabold tracking-tight block mt-1.5 font-brand">{studentName}</span>
              </h1>
              <p className="text-slate-500 text-[14px] mt-2.5 font-normal leading-relaxed">
                Organize seus estudos de idiomas e compromissos acadêmicos com precisão.
              </p>
            </div>

            {/* Official CIL Logo in the corner, same as CEUB logo style */}
            <div id="cil-logo-badge" className="hidden md:block w-36">
              <img
                alt="Logo CIL"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGm7pZoPL83jrSCweCwtJ4mrqypow_vCk6qMDCzodKqk6mpNgwZUVmipskJ-92VD44fe1MdNh_NRQA5fo6Qp4jn2E-sKN4VO83Q4yC8x2qSYgcRXzgo5z7Uyoy4Hu81e4HTcBp8NZgwKEoSiynjwVFAjQkq1x9_igA-CEogvrad4vl09qb01KBYOGm3CVLnCmrRLcJWYZZqKvLlzgpKFLLWUnsIYbCg_sx5yzUeQnnRbSDRqc7-yp0IDaSBXhKJ_-IzyelL66ulrEr"
              />
            </div>
          </section>

          {/* Quick Action Bento Column Layout */}
          <section id="cil-three-columns" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Col 1: Progresso circular */}
            <div
              id="cil-col-progresso"
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between items-center text-center relative overflow-hidden"
            >
              {/* Card Header label */}
              <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3 mb-4">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-[#1A56B0]" />
                  Progresso Acadêmico
                </span>
              </div>

              {/* Circle progress container */}
              <div id="cir-progress-svg" className="my-4 relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  {/* Gray background track */}
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="#eff4ff"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Golden active track representing profile.progress */}
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="#f5a623"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - profile.progress / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute text-center">
                  <span className="text-3xl font-semibold text-[#1a56b0] block">
                    {profile.progress}%
                  </span>
                  <span className="text-[9px] uppercase font-medium text-slate-400 tracking-wider">
                    Concluído
                  </span>
                </div>
              </div>

              {/* Footer text */}
              <div className="mt-2 space-y-1">
                <h4 className="text-[15px] font-medium text-slate-800">
                  {profile.activeLanguage}
                </h4>
                <p className="text-[14px] text-slate-400 font-normal pb-2">
                  {profile.module}
                </p>
              </div>
            </div>

            {/* Col 2: Tarefas Rápidas Checkboxes */}
            <div
              id="cil-col-tarefas-rapidas"
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <ClipboardList className="w-3.5 h-3.5 text-[#1A56B0]" />
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
                          className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all hover:scale-[1.01]
                            ${
                              task.completed
                                ? 'bg-slate-50 border-slate-100 text-slate-400'
                                : 'bg-blue-50/20 border-blue-500/10 text-[#1A56B0]'
                            }
                          `}
                        >
                          {/* Checked box display */}
                          <div className="mt-0.5 select-none" id={`check-click-${task.id}`}>
                            {task.completed ? (
                              <CheckSquare className="w-4.5 h-4.5 text-blue-600" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-[#1A56B0]" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h5 className={`text-[15px] font-medium leading-snug ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {task.title}
                            </h5>
                            <span className="text-[12px] text-slate-450 flex items-center gap-1 mt-1 font-medium uppercase tracking-wider">
                              <IconComponent className="w-3 h-3 text-slate-400" />
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
                className="w-full mt-4 text-center text-xs font-medium text-[#1A56B0] flex items-center justify-center gap-1 hover:underline"
              >
                <span>Ver Todas no Painel</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Col 3: Próximas Aulas (Timeline layout) */}
            <div
              id="cil-col-proximas-aulas"
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <Clock className="w-3.5 h-3.5 text-[#1A56B0]" />
                    Próximas Aulas (Hoje)
                  </span>
                  <span className="text-[10px] bg-blue-50 text-[#1A56B0] font-semibold px-2 py-0.5 rounded uppercase tracking-wide">
                    Hoje
                  </span>
                </div>

                {/* Timeline items list */}
                <div className="relative pl-4 space-y-5 border-l border-slate-200 ml-1.5 py-2">
                  {cilClasses.map((cl, idx) => (
                    <div key={cl.id} className="relative group">
                      {/* Circle indicator on timeline line */}
                      <span className="absolute -left-[21.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1A56B0] border-2 border-white ring-4 ring-slate-100 flex items-center justify-center" />

                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className="text-[15px] font-medium text-slate-800">
                            {cl.title}
                          </h5>
                          <p className="text-[13px] text-slate-500 font-normal flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {cl.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[13px] font-medium text-[#1A56B0] block">
                            {cl.time}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
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
                className="w-full inline-flex md:flex justify-between items-center text-xs font-medium text-[#1A56B0] bg-blue-50/50 hover:bg-blue-100/50 px-4 py-2.5 rounded-md transition-all border border-[#E2E8F0]"
              >
                <span>Acessar Calendário Completo</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#1A56B0]" />
              </button>
            </div>

          </section>
        </div>
      )}

    </div>
  );
}
