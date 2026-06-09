import { LayoutGrid, ClipboardList, Calendar, Settings, LogOut, Globe } from 'lucide-react';
import { ActiveTab, Environment } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  environment: Environment;
  onOpenNewTaskModal: () => void;
  studentName: string;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  environment,
  onOpenNewTaskModal,
  studentName,
  onLogout,
}: SidebarProps) {
  const isCEUB = environment === 'CEUB';

  const menuItems = [
    { id: 'home' as ActiveTab, label: 'Home', icon: LayoutGrid },
    { id: 'tarefas' as ActiveTab, label: 'Tarefas', icon: ClipboardList },
    { id: 'calendario' as ActiveTab, label: 'Calendário', icon: Calendar },
    { id: 'configuracoes' as ActiveTab, label: 'Configurações', icon: Settings },
  ];

  return (
    <aside
      id="sidebar-container"
      className={`fixed left-0 top-0 h-full w-64 z-40 border-r transition-all duration-500 flex flex-col justify-between py-6 px-4
        ${
          isCEUB
            ? 'bg-[#0f172a]/95 border-purple-900/40 text-slate-100 shadow-[4px_0_24px_rgba(15,23,42,0.6)]'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }
      `}
    >
      <div>
        {/* Profile/Brand Section */}
        <div id="sidebar-header" className="px-3 mb-8 transition-all duration-500">
          {isCEUB ? (
            <div id="brand-ceub" className="group">
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span className="w-2.5 h-6 bg-purple-600 rounded-full inline-block animate-pulse"></span>
                Portal CEUB
              </h1>
              <p className="text-xs text-purple-300/70 font-medium tracking-wide mt-1">
                Ambiente Acadêmico
              </p>
            </div>
          ) : (
            <div id="brand-cil" className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
              {/* Specialized CIL visual circle */}
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white mb-2 shadow-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500 rounded-full scale-90 translate-x-1 translate-y-1"></div>
                <Globe className="w-8 h-8 text-white relative z-10 animate-spin-slow" />
                <div className="absolute top-1 right-1 bg-amber-400 text-[10px] font-black px-1 rounded text-slate-950 scale-90 z-20">CIL</div>
              </div>
              <h1 className="text-[17px] font-extrabold tracking-tight text-[#003e6f] leading-tight">
                CIL Institutional
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Language Command Center
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Sidebar menu list */}
        <nav id="sidebar-nav" className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            let buttonClass = '';
            if (isCEUB) {
              buttonClass = isActive
                ? 'bg-purple-900/30 text-purple-300 border-r-4 border-purple-500 font-semibold shadow-[index_0_0_15px_rgba(168,85,247,0.1)]'
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white';
            } else {
              buttonClass = isActive
                ? 'bg-[#005696] text-white font-semibold rounded-xl shadow-md shadow-[#005696]/20'
                : 'text-slate-600 hover:bg-blue-50 hover:text-[#003e6f] rounded-xl';
            }

            return (
              <button
                key={item.id}
                id={`menu-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm transition-all duration-300 rounded-lg group ${buttonClass}`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 
                    ${isActive ? 'scale-105' : 'opacity-85'}
                  `}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div id="sidebar-footer" className="px-2 space-y-4">
        {/* Action button for CIL environment */}
        {!isCEUB && (
          <button
            id="cil-quick-add-btn"
            onClick={onOpenNewTaskModal}
            className="w-full bg-[#ffbb16] hover:bg-[#e4a60f] text-[#271900] font-black py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>+ Nova Atividade</span>
          </button>
        )}

        {/* Logout Button */}
        <button
          id="logout-button"
          onClick={() => {
            alert(`Sessão do aluno ${studentName} finalizada com sucesso.`);
            onLogout();
          }}
          className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium transition-all duration-300 rounded-xl group
            ${
              isCEUB
                ? 'text-slate-400 hover:bg-slate-800/40 hover:text-rose-400'
                : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
            }
          `}
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>{isCEUB ? 'Logout' : 'Sair'}</span>
        </button>
      </div>
    </aside>
  );
}
