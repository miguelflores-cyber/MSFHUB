import { useState } from 'react';
import { ActiveTab, Environment, Task, CalendarEvent, StudentProfile } from './types';
import {
  INITIAL_PROFILE,
  INITIAL_CEUB_TASAS,
  INITIAL_CIL_TASKS,
  INITIAL_CIL_CLASSES,
  INITIAL_CALENDAR_EVENTS,
} from './data';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import TasksView from './components/TasksView';
import CalendarView from './components/CalendarView';
import SettingsView from './components/SettingsView';
import EnvironmentSelector from './components/EnvironmentSelector';

export default function App() {
  // Global States
  const [environment, setEnvironment] = useState<Environment>('CEUB');
  const [hasChosenEnvironment, setHasChosenEnvironment] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [tasks, setTasks] = useState<Task[]>(() => {
    return [...INITIAL_CEUB_TASAS, ...INITIAL_CIL_TASKS];
  });
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // Math Counts
  const currentEnvTasks = tasks.filter((t) => t.environment === environment);
  const pendingCount = currentEnvTasks.filter((t) => !t.completed).length;

  const isCEUB = environment === 'CEUB';

  // Toggle tasks
  const handleToggleTaskCompletion = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const completed = !t.completed;
          return {
            ...t,
            completed,
            completedAt: completed ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  // Add standard task
  const handleAddTask = (taskDetails: Omit<Task, 'id' | 'completed' | 'environment'>) => {
    const newTask: Task = {
      ...taskDetails,
      id: `task-${Date.now()}`,
      completed: false,
      environment: environment,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Remove task
  const handleDeleteTask = (taskId: string) => {
    if (confirm('Deseja realmente excluir esta atividade?')) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  // Add standard calendar event
  const handleAddEvent = (eventDetails: Omit<CalendarEvent, 'id' | 'environment'>) => {
    const newEvent: CalendarEvent = {
      ...eventDetails,
      id: `event-${Date.now()}`,
      environment: environment,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  // Delete calendar event
  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Deseja realmente remover este compromisso do calendário?')) {
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    }
  };

  // Edit profile parameters
  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
  };

  // Informative Notifications popup simulation
  const handleOpenNotifications = () => {
    const pendingNames = currentEnvTasks.filter((t) => !t.completed).map((t) => t.title);
    if (pendingNames.length === 0) {
      alert(`Parabéns ${profile.name}! Sem pendências acadêmicas no momento para o ambiente ${environment}.`);
    } else {
      alert(
        `Olá ${profile.name}! Você possui ${pendingNames.length} pendências no Portal ${environment} para revisar:\n\n` +
          pendingNames.map((name, i) => `${i + 1}. ${name}`).join('\n')
      );
    }
  };

  if (!hasChosenEnvironment) {
    return (
      <EnvironmentSelector
        studentName={profile.name}
        onSelectEnvironment={(env) => {
          setEnvironment(env);
          setHasChosenEnvironment(true);
        }}
      />
    );
  }

  return (
    <div
      id="root-container"
      className={`min-h-screen relative overflow-x-hidden antialiased font-sans transition-all duration-700
        ${isCEUB ? 'bg-grid-dark text-slate-100' : 'bg-grid-notebook text-slate-900'}
      `}
    >
      {/* Immersive Atmospheric Ambient Glow Blobs and Blur circles */}
      <div id="glow-ambient-1"
        className={`ambient-blob rounded-full filter blur-[100px] opacity-40 transition-all duration-1000 -z-10
          ${
            isCEUB
              ? 'top-[-10%] left-[-15%] w-[55vw] h-[55vw] bg-purple-600/30'
              : 'top-[5%] left-[-5%] w-[45vw] h-[45vw] bg-blue-300/20'
          }
        `}
      />
      <div id="glow-ambient-2"
        className={`ambient-blob rounded-full filter blur-[120px] opacity-45 transition-all duration-1000 -z-10
          ${
            isCEUB
              ? 'bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/35'
              : 'bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-amber-200/15'
          }
        `}
      />
      <div id="glow-ambient-3"
        className={`ambient-blob rounded-full filter blur-[90px] opacity-20 transition-all duration-1000 -z-10
          ${
            isCEUB
              ? 'top-[35%] left-[40%] w-[35vw] h-[35vw] bg-fuchsia-600/10'
              : 'top-[25%] left-[30%] w-[35vw] h-[35vw] bg-blue-400/10'
          }
        `}
      />

      {/* Main Structural Layout Sidebar on left, Content on right */}
      <div id="app-scaffolding" className="flex">
        {/* Left fixed Sidebar Navigation bar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          environment={environment}
          studentName={profile.name}
          onOpenNewTaskModal={() => {
            setActiveTab('tarefas');
            setIsNewTaskModalOpen(true);
          }}
          onLogout={() => setHasChosenEnvironment(false)}
        />

        {/* Right side page workspace client frame */}
        <div id="view-space-wrapper" className="flex-1 ml-64 min-h-screen flex flex-col">
          {/* Top visual navigation control header */}
          <TopBar
            environment={environment}
            setEnvironment={setEnvironment}
            pendingTasksCount={pendingCount}
            onOpenNotifications={handleOpenNotifications}
            onGoToSettings={() => setActiveTab('configuracoes')}
            studentName={profile.name}
          />

          {/* Central responsive workspace canvas content */}
          <main
            id="main-canvas"
            className="flex-1 mt-20 p-8 w-full max-w-[1550px] mx-auto relative z-10 flex flex-col justify-start"
          >
            {activeTab === 'home' && (
              <Dashboard
                environment={environment}
                setActiveTab={setActiveTab}
                ceubTasks={tasks.filter((t) => t.environment === 'CEUB')}
                cilTasks={tasks.filter((t) => t.environment === 'CIL')}
                onToggleTaskCompletion={handleToggleTaskCompletion}
                cilClasses={INITIAL_CIL_CLASSES}
                studentName={profile.name}
              />
            )}

            {activeTab === 'tarefas' && (
              <TasksView
                environment={environment}
                tasks={tasks}
                onToggleTaskCompletion={handleToggleTaskCompletion}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                isNewTaskModalOpen={isNewTaskModalOpen}
                setIsNewTaskModalOpen={setIsNewTaskModalOpen}
              />
            )}

            {activeTab === 'calendario' && (
              <CalendarView
                environment={environment}
                events={events}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            )}

            {activeTab === 'configuracoes' && (
              <SettingsView
                environment={environment}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
