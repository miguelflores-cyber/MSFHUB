export type ActiveTab = 'home' | 'tarefas' | 'calendario' | 'configuracoes';
export type Environment = 'CEUB' | 'CIL';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'ALTA' | 'MÉDIA' | 'BAIXA';
  dueDate: string; // e.g., "Amanhã", "15 Out", "Hoje"
  dueDateRaw: string; // YYYY-MM-DD for sorting/validations
  completed: boolean;
  environment: Environment;
  completedAt?: string;
}

export interface AcademicClass {
  id: string;
  title: string;
  time: string;
  duration: string;
  location: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: 'provas' | 'trabalhos' | 'aulas' | 'linguistica';
  environment: Environment;
}

export interface StudentProfile {
  name: string;
  email: string;
  activeLanguage: string;
  module: string;
  progress: number;
}
