import { Task, AcademicClass, CalendarEvent, StudentProfile } from './types';

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Miguel Flores',
  email: 'miguel.flores@sempreceub.com',
  activeLanguage: 'Inglês E1 Básico',
  module: 'Módulo em andamento',
  progress: 75,
};

export const INITIAL_CEUB_TASAS: Task[] = [
  {
    id: 'ceub-task-1',
    title: 'Modelagem de Banco de Dados',
    description: 'Entrega do diagrama ER e normalização no formato PDF.',
    priority: 'ALTA',
    dueDate: 'Amanhã',
    dueDateRaw: '2023-10-16',
    completed: false,
    environment: 'CEUB',
  },
  {
    id: 'ceub-task-2',
    title: 'Desenvolvimento Front-end',
    description: 'Implementação dos componentes de UI utilizando React e Tailwind CSS de acordo com o design system.',
    priority: 'MÉDIA',
    dueDate: '15 Out',
    dueDateRaw: '2023-10-15',
    completed: false,
    environment: 'CEUB',
  },
  {
    id: 'ceub-task-3',
    title: 'Resumo de Engenharia de Software',
    description: 'Leitura dos capítulos 1 a 4 e escrita de resumo executivo.',
    priority: 'BAIXA',
    dueDate: 'Concluído',
    dueDateRaw: '2023-10-12',
    completed: true,
    environment: 'CEUB',
    completedAt: '2023-10-12',
  },
];

export const INITIAL_CIL_TASKS: Task[] = [
  {
    id: 'cil-task-1',
    title: 'Revisar Vocabulary Unit 5',
    description: 'Estudo guiado de phrasal verbs e vocabulário técnico de negócios.',
    priority: 'ALTA',
    dueDate: '15 Out',
    dueDateRaw: '2023-10-15',
    completed: false,
    environment: 'CIL',
  },
  {
    id: 'cil-task-2',
    title: 'Praticar Present Perfect',
    description: 'Resolução de exercícios interativos sobre tempos passados compostos.',
    priority: 'MÉDIA',
    dueDate: '16 Out',
    dueDateRaw: '2023-10-16',
    completed: false,
    environment: 'CIL',
  },
  {
    id: 'cil-task-3',
    title: 'Fazer exercícios de Listening',
    description: 'Escuta atenta ao podcast acadêmico na plataforma de idiomas unificada e envio das repostas.',
    priority: 'ALTA',
    dueDate: 'Hoje',
    dueDateRaw: '2023-10-15',
    completed: false,
    environment: 'CIL',
  },
  {
    id: 'cil-task-4',
    title: 'Preparar apresentação oral',
    description: 'Speech curto de 3 minutos discorrendo sobre desenvolvimento tecnológico sustentável.',
    priority: 'ALTA',
    dueDate: 'Amanhã',
    dueDateRaw: '2023-10-16',
    completed: false,
    environment: 'CIL',
  },
  {
    id: 'cil-task-5',
    title: 'Estudar para avaliação',
    description: 'Rever gramática estrutural alemã e vocabulários das unidades 1 a 4.',
    priority: 'BAIXA',
    dueDate: 'Concluído em 12 Out',
    dueDateRaw: '2023-10-12',
    completed: true,
    environment: 'CIL',
    completedAt: '2023-10-12',
  },
];

export const INITIAL_CIL_CLASSES: AcademicClass[] = [
  {
    id: 'class-1',
    title: 'Francês - B1',
    time: '14:00',
    duration: '1h 30m',
    location: 'Sala Virtual 3',
  },
  {
    id: 'class-2',
    title: 'Espanhol Conversação',
    time: '16:30',
    duration: '1h 00m',
    location: 'Bloco B, Sala 12',
  },
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  // Eventos CEUB (Outubro de 2023)
  {
    id: 'event-ceub-1',
    title: 'Desenvolvimento Front-end (Entrega)',
    date: '2023-10-15',
    time: '23:59',
    category: 'trabalhos',
    environment: 'CEUB',
  },
  {
    id: 'event-ceub-2',
    title: 'Prova de Banco de Dados',
    date: '2023-10-22',
    time: '19:00',
    category: 'provas',
    environment: 'CEUB',
  },
  {
    id: 'event-ceub-3',
    title: 'Pesquisa de Arquitetura Limpa',
    date: '2023-10-27',
    time: '20:00',
    category: 'trabalhos',
    environment: 'CEUB',
  },
  
  // Eventos CIL (Maio de 2024 / Outubro de 2023 para compatibilidade fluida)
  {
    id: 'event-cil-1',
    title: 'Avaliação Oral Francês',
    date: '2023-10-15',
    time: '14:30',
    category: 'provas',
    environment: 'CIL',
  },
  {
    id: 'event-cil-2',
    title: 'Teste de Listening',
    date: '2023-10-18',
    time: '09:00',
    category: 'provas',
    environment: 'CIL',
  },
  {
    id: 'event-cil-3',
    title: 'Entrega de Exercícios Inglês',
    date: '2023-10-20',
    time: '23:59',
    category: 'trabalhos',
    environment: 'CIL',
  },
  {
    id: 'event-cil-4',
    title: 'Apresentação em Espanhol',
    date: '2023-10-22',
    time: '10:00',
    category: 'linguistica',
    environment: 'CIL',
  },
  // Maio 2024 (do screenshot CIL)
  {
    id: 'event-cil-m1',
    title: 'Avaliação Oral',
    date: '2024-05-15',
    time: '14:30',
    category: 'provas',
    environment: 'CIL',
  },
  {
    id: 'event-cil-m2',
    title: 'Teste de Listening',
    date: '2024-05-18',
    time: '09:00',
    category: 'provas',
    environment: 'CIL',
  },
  {
    id: 'event-cil-m3',
    title: 'Entrega de Exercícios',
    date: '2024-05-20',
    time: '23:59',
    category: 'trabalhos',
    environment: 'CIL',
  },
  {
    id: 'event-cil-m4',
    title: 'Apresentação em Inglês',
    date: '2024-05-22',
    time: '10:00',
    category: 'linguistica',
    environment: 'CIL',
  },
];
