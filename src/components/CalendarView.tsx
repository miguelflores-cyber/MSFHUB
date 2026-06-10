import React, { useState, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Bookmark, CircleDot, Clock, Plus, Trash2, X, Sparkles } from 'lucide-react';
import { CalendarEvent, Environment } from '../types';

interface CalendarViewProps {
  environment: Environment;
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id' | 'environment'>) => void;
  onDeleteEvent: (eventId: string) => void;
}

export default function CalendarView({
  environment,
  events,
  onAddEvent,
  onDeleteEvent,
}: CalendarViewProps) {
  const isCEUB = environment === 'CEUB';

  // State for Month and Year
  // Default to Oct 2023 for CEUB and May 2024 for CIL (as in screenshots)
  const [currentMonth, setCurrentMonth] = useState(isCEUB ? 9 : 4); // 0-indexed (9 = Oct, 4 = May)
  const [currentYear, setCurrentYear] = useState(isCEUB ? 2023 : 2024);

  // Sync default dates when environment changes
  useEffect(() => {
    setCurrentMonth(isCEUB ? 9 : 4);
    setCurrentYear(isCEUB ? 2023 : 2024);
  }, [environment, isCEUB]);

  // Form State
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [clickedDay, setClickedDay] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('14:00');
  const [eventCategory, setEventCategory] = useState<'provas' | 'trabalhos' | 'aulas' | 'linguistica'>('trabalhos');

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  // Calculate days in active month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Calculate first day of the month offset (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOffset = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonthCount = getDaysInMonth(currentMonth, currentYear);
  const offset = getFirstDayOffset(currentMonth, currentYear);

  // Navigate Months
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Format Helper for matching ISO structure
  const makeDateString = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    return `${currentYear}-${formattedMonth}-${formattedDay}`;
  };

  const getDayEvents = (day: number) => {
    const dateStr = makeDateString(day);
    return events.filter((e) => e.date === dateStr && e.environment === environment);
  };

  // Dynamic filter for upcoming list sidebar (shows events in current month/year)
  const sidebarEvents = events.filter((e) => {
    const eventDate = new Date(e.date + 'T00:00:00');
    return (
      eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear &&
      e.environment === environment
    );
  });

  const handleCellClick = (day: number) => {
    setClickedDay(day);
    setShowAddEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !clickedDay) return;

    onAddEvent({
      title: eventTitle,
      date: makeDateString(clickedDay),
      time: eventTime,
      category: eventCategory,
    });

    // Reset Form
    setEventTitle('');
    setEventTime('14:00');
    setClickedDay(null);
    setShowAddEventModal(false);
  };

  return (
    <div id="calendar-view-container" className="grid grid-cols-1 xl:grid-cols-4 gap-8 animate-fade-in pb-12">
      
      {/* Left side: The Grid Calendar structure */}
      <div id="calendar-left-grid" className="xl:col-span-3 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-medium tracking-tight ${isCEUB ? 'text-white' : 'text-[#1A56B0] font-sans'}`}>
              Calendário
            </h1>
            <p className="text-slate-400 text-[14px] font-normal mt-1">
              {isCEUB
                ? 'Organize provas, trabalhos e compromissos acadêmicos.'
                : 'Organize avaliações, atividades e compromissos do CIL.'}
            </p>
          </div>
          
          {/* Month Navigator Pills */}
          <div className="flex items-center gap-2 p-1 bg-slate-300/10 border border-slate-300/10 rounded-md">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 cursor-pointer hover:bg-slate-300/20 rounded text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-xs font-semibold uppercase tracking-wider px-2 ${isCEUB ? 'text-purple-300' : 'text-[#1A56B0]'}`}>
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 cursor-pointer hover:bg-slate-300/20 rounded text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Grid Days rendering */}
        <div
          id="calendar-grid-card"
          className={`rounded-xl p-6 border transition-all duration-500
            ${
              isCEUB
                ? 'bg-[#1E1535] border-[#7C5CBF]/25 text-slate-100 shadow-sm'
                : 'bg-white border-[#E2E8F0] text-slate-900 shadow-sm'
            }
          `}
        >
          {/* Days column headers banner */}
          <div className="grid grid-cols-7 gap-1 text-center py-2.5 mb-2 font-medium text-[11px] tracking-wider text-slate-400">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Core Monthly days cells */}
          <div className="grid grid-cols-7 gap-2.5 min-h-[380px]">
            {/* Blank cells for padding offset */}
            {Array.from({ length: offset }).map((_, idx) => (
              <div
                key={`offset-${idx}`}
                className="opacity-20 flex items-center justify-center text-xs text-slate-500/30 font-medium select-none"
              >
                *
              </div>
            ))}

            {/* Natural active days */}
            {Array.from({ length: daysInMonthCount }).map((_, idx) => {
              const day = idx + 1;
              const dayEvents = getDayEvents(day);
              const hasEvents = dayEvents.length > 0;
              
              // Custom default today highlighters matching original images
              // CEUB: Oct 15 / CIL: May 8 or today's visual highlight
              const isPristineToday =
                (isCEUB && currentYear === 2023 && currentMonth === 9 && day === 15) ||
                (!isCEUB && currentYear === 2024 && currentMonth === 4 && day === 8);

              let activeTodayStyle = '';
              if (isPristineToday) {
                activeTodayStyle = isCEUB
                  ? 'ring-2 ring-purple-500 bg-purple-600/20 text-white font-black'
                  : 'bg-[#1A56B0] text-white ring-2 ring-[#1A56B0]/15 font-medium';
              }

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => handleCellClick(day)}
                  className={`relative cursor-pointer group flex flex-col justify-between items-stretch p-2 rounded-lg border transition-all hover:scale-[1.01] active:scale-95 min-h-[82px] md:min-h-[96px] overflow-hidden
                    ${
                      isCEUB
                        ? 'bg-[#1E1535]/30 border-[#7C5CBF]/10 hover:border-[#7C5CBF]/40'
                        : 'bg-slate-50 border-[#E2E8F0]/50 hover:bg-[#EBF2FF]/30 hover:border-[#1A56B0]/25'
                    }
                    ${activeTodayStyle}
                  `}
                >
                  <div className="flex justify-between items-center w-full mb-1.5">
                    <span className="text-xs font-bold font-mono">{day}</span>
                    {hasEvents && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full md:hidden
                          ${isCEUB ? 'bg-purple-400' : 'bg-blue-600'}
                        `}
                      />
                    )}
                  </div>

                  {/* Inline list of events directly inside the block */}
                  <div className="flex-1 flex flex-col gap-1 w-full overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => {
                      const isProva = ev.category === 'provas';
                      let eventBadgeStyle = '';
                      if (isCEUB) {
                        eventBadgeStyle = isProva
                          ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                          : 'bg-purple-500/10 border border-[#7C5CBF]/20 text-purple-200';
                      } else {
                        eventBadgeStyle = isProva
                          ? 'bg-rose-50 border border-rose-250 text-rose-700'
                          : 'bg-[#EBF2FF] border border-[#EBF2FF] text-[#1A56B0]';
                      }

                      return (
                        <div
                          key={ev.id}
                          className={`hidden md:block text-[9px] px-1 py-0.5 rounded truncate w-full font-medium leading-tight ${eventBadgeStyle}`}
                          title={`${ev.time} - ${ev.title}`}
                        >
                          {ev.title}
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <p className="hidden md:block text-[8px] text-slate-400 font-medium pl-1 leading-none mt-0.5">
                        + {dayEvents.length - 2} mais
                      </p>
                    )}
                  </div>

                  {/* Tooltip display list */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 text-slate-200 text-[10px] p-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl pointer-events-none w-36 max-w-sm">
                    <p className="font-bold border-b border-slate-800 pb-1 mb-1 text-center">Dia {day}</p>
                    {hasEvents ? (
                      dayEvents.map((ev) => (
                        <p key={ev.id} className="truncate">• {ev.title}</p>
                      ))
                    ) : (
                      <p className="text-[9px] text-slate-400 text-center">Clique para agendar</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right side: Sidebar list for scheduled events */}
      <div id="calendar-right-sidebar" className="space-y-6">
        <h3
          className={`text-[15px] font-medium flex items-center gap-2 border-b pb-2
            ${isCEUB ? 'text-purple-300 border-[#7C5CBF]/20' : 'text-[#1A56B0] border-[#E2E8F0]'}
          `}
        >
          <CircleDot className={`w-4 h-4 ${isCEUB ? 'text-purple-400' : 'text-[#1A56B0]'}`} />
          <span>Próximos Eventos ({sidebarEvents.length})</span>
        </h3>

        <div id="sidebar-events-list" className="space-y-4 max-h-[64vh] overflow-y-auto pr-1">
          {sidebarEvents.length === 0 ? (
            <div className="text-center p-6 py-12 rounded-2xl border border-dashed border-slate-300/20">
              <Sparkles className="w-8 h-8 text-slate-400/40 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Sem compromissos em destaque neste mês de {monthNames[currentMonth]}.</p>
            </div>
          ) : (
            sidebarEvents.map((ev) => {
              // Extract day from dates "YYYY-MM-DD" -> "15 Out" or short labels
              const dateObj = new Date(ev.date + 'T00:00:00');
              const shortDay = dateObj.getDate();
              const shortMonthStr = monthNames[dateObj.getMonth()].slice(0, 3);
              const customPriorityTag =
                ev.category === 'provas' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-[#74f174]';

              return (
                <div
                  key={ev.id}
                  className={`group relative rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]
                    ${
                      isCEUB
                        ? 'bg-[#1E1535] hover:bg-[#251A42] border-[#7C5CBF]/25 text-white'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-950'
                    }
                  `}
                >
                  <div className="flex justify-between items-start gap-1 mb-2">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1.5 rounded-full ${customPriorityTag}`}>
                      {ev.category === 'provas' ? 'Avaliação' : 'Atividade'}
                    </span>
                    
                    {/* Delete action */}
                    <button
                      onClick={() => onDeleteEvent(ev.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 transition-all cursor-pointer"
                      title="Deletar compromisso"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <h4 className="text-[13px] font-extrabold leading-snug">
                    {ev.title}
                  </h4>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {shortDay} de {shortMonthStr} • {ev.time}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Event Modal overlay */}
      {showAddEventModal && clickedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 border shadow-xl flex flex-col space-y-4 animate-scale-up
              ${
                isCEUB
                  ? 'bg-[#171f33] border-purple-900/30 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }
            `}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100/10">
              <h2 className="text-base font-black flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-purple-400" />
                Agendar - Dia {clickedDay}
              </h2>
              <button onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Título do Evento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Prova Substitutiva de Inglês"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2
                    ${
                      isCEUB
                        ? 'bg-slate-900 border-purple-900/30 text-white focus:ring-purple-500/30'
                        : 'bg-slate-50 border-slate-200 focus:ring-blue-500/30'
                    }
                  `}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Horário</label>
                  <input
                    type="time"
                    required
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className={`w-full px-2 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2
                      ${
                        isCEUB
                          ? 'bg-slate-900 border-purple-900/30 text-white'
                          : 'bg-slate-50 border-slate-200'
                      }
                    `}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Categoria</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className={`w-full px-2 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2
                      ${
                        isCEUB
                          ? 'bg-slate-900 border-purple-900/30 text-white'
                          : 'bg-slate-50 border-slate-200'
                      }
                    `}
                  >
                    <option value="trabalhos">Trabalho</option>
                    <option value="provas">Avaliação</option>
                    <option value="linguistica">Lingüística</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-md
                  ${isCEUB ? 'bg-purple-600 hover:bg-purple-700' : 'bg-[#005696] hover:bg-[#004880]'}
                `}
              >
                Adicionar Compromisso
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
