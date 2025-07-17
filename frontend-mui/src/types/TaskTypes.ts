export interface Task {
  id: string;
  text: string;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
}

export interface TaskSections {
  default: Task[];
  pinned: Task[];
  archived: Task[];
}

export type TaskStatus = 'default' | 'pinned' | 'archived';