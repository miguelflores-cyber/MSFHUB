import { Bell, Settings, User, ArrowLeftRight } from 'lucide-react';
import { Environment } from '../types';

interface TopBarProps {
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  pendingTasksCount: number;
  onOpenNotifications: () => void;
  onGoToSettings: () => void;
  studentName: string;
}

export default function TopBar({
  environment,
  setEnvironment,
  pendingTasksCount,
  onOpenNotifications,
  onGoToSettings,
  studentName,
}: TopBarProps) {
  const isCEUB = environment === 'CEUB';

  const toggleEnvironment = () => {
    setEnvironment(isCEUB ? 'CIL' : 'CEUB');
  };

  // Human date string in Portuguese matching "15 Outubro 2023"
  const formattedDate = '15 Outubro 2023';

  return (
    <header
      id="top-bar-header"
      className={`fixed top-0 right-0 left-64 h-16 px-8 z-30 flex justify-between items-center transition-all duration-500 border-b
        ${
          isCEUB
            ? 'bg-[#1A1025]/90 backdrop-blur-md border-[#7C5CBF]/15 text-slate-100'
            : 'bg-white/90 backdrop-blur-md border-slate-200 text-slate-800'
        }
      `}
    >
      {/* Left side: Interactive Environment selector */}
      <div className="flex items-center gap-4">
        <button
          id="env-toggle-pill"
          onClick={toggleEnvironment}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border text-[11px] font-medium uppercase tracking-wider transition-all duration-300 group
            ${
              isCEUB
                ? 'bg-[#1E1535]/50 border-purple-500/15 text-purple-200 hover:bg-purple-900/20'
                : 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100'
            }
          `}
          title="Clique para alternar o ambiente institucional"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isCEUB ? 'bg-purple-400' : 'bg-blue-500'}`} />
          <span>AMBIENTE: {environment}</span>
          <ArrowLeftRight className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
        </button>

        <span className="text-xs text-slate-400 font-medium hidden lg:inline">
          {isCEUB ? 'Universidade de Brasília • Graduação' : 'Language Program Portal'}
        </span>
      </div>

      {/* Right side: Tools, Date and User profile */}
      <div className="flex items-center gap-6">
        <span className="text-xs uppercase tracking-wider text-slate-450 font-normal hidden md:inline">
          {formattedDate}
        </span>

        <div className="flex items-center gap-4">
          {/* Notifications Notification icon */}
          <button
            id="notifications-bell-btn"
            onClick={onOpenNotifications}
            className={`p-2 rounded-full relative transition-colors
              ${
                isCEUB
                  ? 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/40'
                  : 'text-slate-500 hover:text-[#003e6f] hover:bg-slate-100'
              }
            `}
          >
            <Bell className="w-5.5 h-5.5" />
            {pendingTasksCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">
                {pendingTasksCount}
              </span>
            )}
          </button>

          {/* Quick settings gear icon */}
          <button
            id="quick-settings-btn"
            onClick={onGoToSettings}
            className={`p-2 rounded-full transition-colors
              ${
                isCEUB
                  ? 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/40'
                  : 'text-slate-500 hover:text-[#003e6f] hover:bg-slate-100'
              }
            `}
            title="Configurações de Perfil"
          >
            <Settings className="w-5.5 h-5.5" />
          </button>

          {/* Vertical Separator */}
          <span className="h-6 w-px bg-slate-300/30" />

          {/* User profile info / actions */}
          <button
            id="user-profile-menu-btn"
            onClick={onGoToSettings}
            className="flex items-center gap-2 group text-left"
          >
            <div
              className={`w-9.5 h-9.5 rounded-full flex items-center justify-center border transition-all overflow-hidden
                ${
                  isCEUB
                    ? 'bg-slate-800 border-purple-500/30 group-hover:border-purple-400'
                    : 'bg-blue-50 border-blue-200 group-hover:border-blue-400'
                }
              `}
            >
              <User className={`w-5 h-5 ${isCEUB ? 'text-purple-400' : 'text-blue-600'}`} />
            </div>
            <div className="hidden xl:block">
              <p className="text-xs font-bold leading-tight truncate max-w-[124px]">
                {studentName}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                {isCEUB ? 'Estudante' : 'Línguas'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
