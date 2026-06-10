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
            ? 'bg-[#130B1E] border-purple-950/20 text-slate-100 shadow-[4px_0_24px_rgba(19,11,30,0.5)]'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }
      `}
    >
      <div>
        {/* Profile/Brand Section */}
        <div id="sidebar-header" className="px-3 mb-8 transition-all duration-500">
          {isCEUB ? (
            <div id="brand-ceub" className="group">
              <h1 className="text-xl font-bold font-brand tracking-tight text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-sm inline-block shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                Portal CEUB
              </h1>
              <p className="text-[11px] text-purple-300/60 font-medium tracking-wide mt-1 font-sans">
                Ambiente Acadêmico
              </p>
            </div>
          ) : (
            <div id="brand-cil" className="group">
              <h1 className="text-xl font-bold font-brand tracking-tight text-[#1A56B0] flex items-center gap-2">
                <span className="w-1 h-5 bg-[#1A56B0] rounded-sm inline-block shadow-[0_0_8px_rgba(26,86,176,0.3)]"></span>
                Portal CIL
              </h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide mt-1 font-sans">
                Centro de Idiomas e Línguas
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Sidebar menu list */}
        <nav id="sidebar-nav" className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            let buttonClass = '';
            if (isCEUB) {
              buttonClass = isActive
                ? 'bg-purple-950/25 text-purple-300 border-l-[3px] border-purple-500 font-medium px-4 py-2.5 text-[13px] rounded-none rounded-r-md'
                : 'text-slate-400 hover:bg-purple-950/15 hover:text-white px-4 py-2.5 text-[13px] rounded-none rounded-r-md';
            } else {
              buttonClass = isActive
                ? 'bg-[#EBF2FF] text-[#1A56B0] border-l-[3px] border-[#1A56B0] font-medium px-4 py-2.5 text-[13px] rounded-none rounded-r-md'
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#1A56B0] px-4 py-2.5 text-[13px] rounded-none rounded-r-md';
            }

            return (
              <button
                key={item.id}
                id={`menu-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full transition-all duration-300 group
                  ${buttonClass}
                `}
              >
                <Icon
                  className={`transition-transform duration-300 group-hover:scale-105 w-4 h-4
                    ${isActive ? 'scale-100' : 'opacity-85'}
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
            className="w-full bg-[#f5a623] hover:bg-[#e09315] text-slate-900 font-medium py-2 px-3 rounded-md shadow-sm text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="font-semibold">+ Nova Atividade</span>
          </button>
        )}

        {/* Logout Button */}
        <button
          id="logout-button"
          onClick={() => {
            onLogout();
          }}
          className={`flex items-center gap-3 w-full transition-all duration-300 group text-[13px] py-2.5 px-4 rounded-none rounded-r-md
            ${
              isCEUB
                ? 'text-slate-400 hover:bg-purple-950/15 hover:text-rose-300'
                : 'text-slate-600 hover:bg-slate-50 hover:text-rose-600'
            }
          `}
        >
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>{isCEUB ? 'Logout' : 'Sair'}</span>
        </button>
      </div>
    </aside>
  );
}
