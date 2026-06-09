import React, { useState } from 'react';
import { Plus, CheckCircle, Trash2, Calendar, ClipboardCheck, AlertTriangle, PlayCircle, Loader2, X } from 'lucide-react';
import { Task, Environment } from '../types';

interface TasksViewProps {
  environment: Environment;
  tasks: Task[];
  onToggleTaskCompletion: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'environment'>) => void;
  onDeleteTask: (taskId: string) => void;
  isNewTaskModalOpen: boolean;
  setIsNewTaskModalOpen: (open: boolean) => void;
}

export default function TasksView({
  environment,
  tasks,
  onToggleTaskCompletion,
  onAddTask,
  onDeleteTask,
  isNewTaskModalOpen,
  setIsNewTaskModalOpen,
}: TasksViewProps) {
  const isCEUB = environment === 'CEUB';

  // Filter tasks specific to this environment
  const envTasks = tasks.filter((t) => t.environment === environment);

  // Divide into Pending & Completed sets
  const pendingTasks = envTasks.filter((t) => !t.completed);
  const completedTasks = envTasks.filter((t) => t.completed);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'ALTA' | 'MÉDIA' | 'BAIXA'>('ALTA');
  const [newDueDate, setNewDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Convert date string of format YYYY-MM-DD to Portuguese short string
    // e.g., "2023-10-15" -> "15 Out" or custom labels
    let shortDateStr = 'Hoje';
    if (newDueDate) {
      const dateParts = newDueDate.split('-');
      if (dateParts.length === 3) {
        const monthMap: { [key: string]: string } = {
          '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
          '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez'
        };
        const day = dateParts[2];
        const monthNum = dateParts[1];
        shortDateStr = `${parseInt(day)} ${monthMap[monthNum] || 'Out'}`;
      }
    }

    onAddTask({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      dueDate: shortDateStr,
      dueDateRaw: newDueDate || '2023-10-15',
    });

    // Reset local states & close modal
    setNewTitle('');
    setNewDescription('');
    setNewPriority('ALTA');
    setNewDueDate('');
    setIsNewTaskModalOpen(false);
  };

  return (
    <div id="tasks-container" className="space-y-8 animate-fade-in relative">
      
      {/* Title Header area */}
      <div id="tasks-header" className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1
            id="tasks-title-h1"
            className={`text-3xl font-black tracking-tight ${isCEUB ? 'text-white' : 'text-[#003e6f]'}`}
          >
            Tarefas {isCEUB ? '' : '• CIL Idiomas'}
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">
            {isCEUB
              ? 'Organize suas atividades acadêmicas.'
              : 'Organize suas atividades e estudos de idiomas.'}
          </p>
        </div>

        {/* Create Task Button */}
        <button
          id="trigger-add-task-btn"
          onClick={() => setIsNewTaskModalOpen(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]
            ${
              isCEUB
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/10 hover:shadow-purple-600/30 font-extrabold'
                : 'bg-[#005696] hover:bg-[#004880] text-white shadow-blue-500/10 hover:shadow-blue-500/30'
            }
          `}
        >
          <Plus className="w-5 h-5" />
          <span>Nova Tarefa</span>
        </button>
      </div>

      {/* Form Dialog Panel (renders when open) */}
      {isNewTaskModalOpen && (
        <div
          id="task-form-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
        >
          <div
            id="task-form-card"
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-xl flex flex-col space-y-4 animate-scale-up
              ${
                isCEUB
                  ? 'bg-[#171f33] border-purple-900/30 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }
            `}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100/10">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ClipboardCheck className={`w-5 h-5 ${isCEUB ? 'text-purple-400' : 'text-blue-600'}`} />
                Adicionar Nova Tarefa
              </h2>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Task Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Título da Atividade</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Resumo de Banco de Dados"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2
                    ${
                      isCEUB
                        ? 'bg-slate-900 border-purple-900/30 text-white focus:ring-purple-500/30 focus:border-purple-500/80'
                        : 'bg-slate-50 border-slate-200 focus:ring-blue-500/30 focus:border-blue-600'
                    }
                  `}
                />
              </div>

              {/* Task Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Descrição / Notas</label>
                <textarea
                  placeholder="Descreva detalhes ou instruções desta entrega."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2
                    ${
                      isCEUB
                        ? 'bg-slate-900 border-purple-900/30 text-white focus:ring-purple-500/30 focus:border-purple-500/80'
                        : 'bg-slate-50 border-slate-200 focus:ring-blue-500/30 focus:border-blue-600'
                    }
                  `}
                />
              </div>

              {/* Priority & Due Date in Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prioridade</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2
                      ${
                        isCEUB
                          ? 'bg-slate-900 border-purple-900/30 text-white focus:ring-purple-500/30 focus:border-purple-500/80'
                          : 'bg-slate-50 border-slate-200 focus:ring-blue-500/30 focus:border-blue-600'
                      }
                    `}
                  >
                    <option value="ALTA">ALTA</option>
                    <option value="MÉDIA">MÉDIA</option>
                    <option value="BAIXA">BAIXA</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prazo final</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className={`w-full px-3 py-2 text-sm border focus:outline-none focus:ring-2
                      ${
                        isCEUB
                          ? 'bg-slate-900 border-purple-900/30 text-white focus:ring-purple-500/30 focus:border-purple-500/80'
                          : 'bg-slate-50 border-slate-200 focus:ring-blue-500/30 focus:border-blue-600'
                      }
                    `}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-2 border-t border-slate-100/10">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-md hover:scale-[1.01] active:scale-95 transition-all
                    ${
                      isCEUB
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-[#005696] hover:bg-[#004880]'
                    }
                  `}
                >
                  Salvar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Two columns: Pending (Pendentes) and Completed (Concluídas) */}
      <div id="tasks-scaffolding-board" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Column 1: Pedeing Tasks */}
        <div id="col-pending" className="flex flex-col space-y-4">
          <h2
            className={`text-lg font-bold flex items-center gap-2 border-b pb-2
              ${isCEUB ? 'text-purple-300 border-purple-900/20' : 'text-[#005696] border-slate-200'}
            `}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>Pendentes ({pendingTasks.length})</span>
          </h2>

          <div id="pending-list" className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {pendingTasks.length === 0 ? (
              <div id="empty-pending" className="text-center py-12 p-6 rounded-2xl border border-dashed border-slate-300/20">
                <CheckCircle className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-400">Excelente! Todas as tarefas concluídas!</p>
              </div>
            ) : (
              pendingTasks.map((task) => {
                // Determine priority badge style
                let priorityBadge = '';
                if (task.priority === 'ALTA') {
                  priorityBadge = 'bg-rose-500/10 text-rose-500 border-rose-500/20';
                } else if (task.priority === 'MÉDIA') {
                  priorityBadge = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
                } else {
                  priorityBadge = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
                }

                return (
                  <div
                    key={task.id}
                    className={`group relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.01] shadow-sm
                      ${
                        isCEUB
                          ? 'bg-[#171f33]/90 hover:bg-[#1a233b] border-purple-900/30 hover:border-purple-500/30 text-white'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-500/30 text-slate-900'
                      }
                    `}
                  >
                    {/* Visual Hover Gradient */}
                    {isCEUB && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent rounded-2xl pointer-events-none" />
                    )}

                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <h3 className="font-extrabold text-sm md:text-base pr-4 leading-tight">
                        {task.title}
                      </h3>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1.5 rounded-full border ${priorityBadge}`}>
                        {task.priority}
                      </span>
                    </div>

                    <p className={`text-xs md:text-sm mb-4 relative z-10 ${isCEUB ? 'text-slate-400' : 'text-slate-500'}`}>
                      {task.description}
                    </p>

                    <div className="flex justify-between items-center relative z-10">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {task.dueDate}
                      </span>

                      <div className="flex items-center gap-3">
                        {/* Action toggle checkbox */}
                        <button
                          onClick={() => onToggleTaskCompletion(task.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 flex items-center gap-1 transition-all"
                          title="Clique para concluir"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Concluir</span>
                        </button>

                        {/* Trash symbol */}
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="p-1 px-2 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Remover Tarefa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 2: Completed Tasks */}
        <div id="col-completed" className="flex flex-col space-y-4">
          <h2
            className={`text-lg font-bold flex items-center gap-2 border-b pb-2
              ${isCEUB ? 'text-purple-300 border-purple-900/20' : 'text-[#005696] border-slate-200'}
            `}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Concluídas ({completedTasks.length})</span>
          </h2>

          <div id="completed-list" className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {completedTasks.length === 0 ? (
              <div id="empty-completed" className="text-center py-12 p-6 rounded-2xl border border-dashed border-slate-300/20">
                <AlertTriangle className="w-10 h-10 text-amber-500/30 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-400">Nenhuma tarefa concluída nesta semana.</p>
              </div>
            ) : (
              completedTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl p-5 border transition-all duration-300 opacity-70
                      ${
                        isCEUB
                          ? 'bg-[#171f33]/40 border-purple-900/10 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-extrabold text-sm md:text-base leading-tight line-through text-slate-400/80">
                        {task.title}
                      </h3>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-300/10">
                        BAIXA
                      </span>
                    </div>

                    <p className="text-xs md:text-sm mb-4 line-through text-slate-500/80">
                      {task.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Concluído</span>
                      </span>

                      <div className="flex items-center gap-3">
                        {/* Toggle state action */}
                        <button
                          onClick={() => onToggleTaskCompletion(task.id)}
                          className="text-xs text-slate-400 hover:text-blue-500 underline"
                        >
                          Refazer
                        </button>

                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="p-1 px-2 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
