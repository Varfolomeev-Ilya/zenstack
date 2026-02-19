import { IUserShort } from '@/features/user/api/user-api.types';
import { INamedEntity } from '@/shared/types/entity.types';

export enum DefaultView {
  BOARD = 'board',
  LIST = 'list',
  TIMELINE = 'timeline',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  ARCHIVED = 'archived',
  BLOCKED = 'blocked',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum MessageEntityType {
  TASK = 'task',
  COLUMN = 'column',
  PROJECT = 'project',
  SPACE = 'space',
}

export type TaskFilters = {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignee?: string[];
  dueDateRange?: { from: string; to: string };
};

export interface IMessage {
  id: string;
  content: string;
  author: IUserShort;
  created_at: string;
  updated_at?: string;
  entityId: string;
  entityType: MessageEntityType;
  attachments?: IAttachment[];
  parentId?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface IAttachment {
  id: string;
  name: string;
  url: string;
  type: string; // mime-type
  size: number; // в bytes
  uploadedBy: IUserShort['id'];
  uploadedAt: string;
}

export interface IColumnTask extends INamedEntity {
  label?: string[];
  status?: TaskStatus;
  creator: IUserShort;
  dueDate?: string;
  priority?: TaskPriority;
  color?: string;
  labels?: string[];
  estimate?: string;
  messages?: IMessage[];
  githubLink?: string;
  subTasks?: IColumnTask[];
}

export interface IProjectColumn extends INamedEntity {
  order: number;
  tasks?: IColumnTask[];
}
