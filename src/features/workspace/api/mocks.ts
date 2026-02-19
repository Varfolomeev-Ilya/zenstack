import { IOrganization } from './organization.types';
import { IOrganizationProject } from './project.types';
import { IOrganizationSpace } from './workspace.types';

import { DefaultView, IColumnTask, IProjectColumn } from '@/features/board/api/board.types';

export const mockStorage = {
  organizations: new Map<string, IOrganization>(),
};

const defaultOrg: IOrganization = {
  id: '1',
  created_at: '2026-02-18T15:26:30.307006Z',
  updated_at: '2026-02-18T16:54:15.713504Z',
  name: 'ZenStack',
  owner: {
    id: 'adc01927-00b2-41f7-8d34-0a177dc1abfb',
    email: 'ilya323472@yandex.ru',
    name: 'ilya323472',
    created_at: '2026-02-18T15:26:30.307006Z',
    updated_at: '2026-02-18T16:54:15.713504Z',
  },
  members: [],
  spaces: [],
};

export const defaultProjectColumns: Omit<IProjectColumn, 'project_id'>[] = [
  {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'To Do',
    order: 1,
    tasks: [],
  },
  {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'In Progress',
    order: 2,
    tasks: [],
  },
  {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'Done',
    order: 3,
    tasks: [],
  },
];

export class MockDB {
  private organizations: Map<string, IOrganization> = new Map();
  private spaces: Map<string, IOrganizationSpace> = new Map();
  private projects: Map<string, IOrganizationProject> = new Map();
  private columns: Map<string, IProjectColumn> = new Map();
  private tasks: Map<string, IColumnTask> = new Map();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.organizations.set(defaultOrg.id, defaultOrg);
  }

  getFullOrganization(id: string) {
    const org = this.organizations.get(id);

    if (!org) {
      return null;
    }

    return {
      ...org,
    };
  }

  getFullSpace(id: string) {
    const space = this.spaces.get(id);

    if (!space) {
      return null;
    }

    return {
      ...space,
      projects: this.projects,
    };
  }

  getProjectFull(id: string) {
    const project = this.projects.get(id);

    if (!project) {
      return null;
    }

    return project;
  }

  // basic getters
  getSpacesByOrganization(orgId: string): IOrganizationSpace[] {
    return Array.from(this.spaces.values()).filter(space => space.organization_id === orgId);
  }

  getProjectsBySpace(spaceId: string): IOrganizationProject[] {
    return Array.from(this.projects.values()).filter(project => project.space_id === spaceId);
  }

  getColumnsByProject(projectId: string): IProjectColumn[] {
    return Array.from(this.columns.values())
      .filter(column => column.project_id === projectId)
      .sort((a, b) => a.order - b.order);
  }

  getTasksByColumn(columnId: string): IColumnTask[] {
    return Array.from(this.tasks.values()).filter(task => task.column_id === columnId);
  }

  // CRUD
  createSpace(
    data: Omit<IOrganizationSpace, 'id' | 'created_at' | 'updated_at'>,
  ): IOrganizationSpace {
    const newSpace: IOrganizationSpace = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.spaces.set(newSpace.id, newSpace);

    const org = this.organizations.get(data.organization_id);

    if (org) {
      this.organizations.set(org.id, {
        ...org,
        spaces: [...(org.spaces || []), newSpace],
        updated_at: new Date().toISOString(),
      });
    }

    return newSpace;
  }

  createProject(
    data: Omit<IOrganizationProject, 'id' | 'created_at' | 'updated_at'>,
  ): IOrganizationProject {
    const newProject: IOrganizationProject = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.projects.set(newProject.id, newProject);

    const space = this.spaces.get(data.space_id);

    if (space) {
      this.spaces.set(space.id, {
        ...space,
        projects: [...(space.projects || []), newProject],
        updated_at: new Date().toISOString(),
      });
    }

    return newProject;
  }

  createColumn(data: Omit<IProjectColumn, 'id' | 'created_at' | 'updated_at'>): IProjectColumn {
    const newColumn: IProjectColumn = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.columns.set(newColumn.id, newColumn);

    const project = this.projects.get(data.project_id);

    if (project) {
      this.projects.set(project.id, {
        ...project,
        columns: [...(project.columns || []), newColumn],
        updated_at: new Date().toISOString(),
      });
    }

    return newColumn;
  }

  createTask(data: Omit<IColumnTask, 'id' | 'created_at' | 'updated_at'>): IColumnTask {
    const newTask: IColumnTask = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.tasks.set(newTask.id, newTask);

    const column = this.columns.get(data.column_id);

    if (column) {
      this.columns.set(column.id, {
        ...column,
        tasks: [...(column.tasks || []), newTask],
        updated_at: new Date().toISOString(),
      });
    }

    return newTask;
  }

  updateOrganization(
    data: Pick<IOrganization, 'id' | 'name' | 'description'>,
  ): IOrganization | null {
    const org = this.organizations.get(data.id);

    if (!org) {
      return null;
    }

    const updatedOrg = {
      ...org,
      updated_at: new Date().toISOString(),
      name: data.name,
      description: data.description,
    };

    this.organizations.set(data.id, updatedOrg);

    return updatedOrg;
  }
  updateProject(data: {
    id: string;
    name?: string;
    description?: string;
    defaultView?: DefaultView;
  }): IOrganizationProject | null {
    const project = this.projects.get(data.id);

    if (!project) {
      return null;
    }

    const updatedProject = {
      ...project,
      updated_at: new Date().toISOString(),
      name: data.name ?? project.name,
      description: data.description ?? project.description,
      defaultView: data.defaultView ?? project.defaultView,
    };

    this.projects.set(data.id, updatedProject);

    return updatedProject;
  }

  updateColumn(data: Pick<IProjectColumn, 'name' | 'id' | 'order'>): IProjectColumn | null {
    const column = this.columns.get(data.id);

    if (!column) {
      return null;
    }

    const updatedColumn = {
      ...column,
      updated_at: new Date().toISOString(),
      name: data.name,
      order: data.order,
    };

    this.columns.set(data.id, updatedColumn);

    return updatedColumn;
  }

  updateTask(data: Omit<IColumnTask, 'created_at' | 'updated_at'>): IColumnTask | null {
    const task = this.tasks.get(data.id);

    if (!task) {
      return null;
    }

    const updatedTask = {
      ...task,
      ...data,
      updated_at: new Date().toISOString(),
    };

    this.tasks.set(data.id, updatedTask);

    return updatedTask;
  }

  deleteSpace(id: string) {
    const space = this.spaces.get(id);

    if (!space) {
      return false;
    }

    this.getProjectsBySpace(id).forEach(project => this.deleteProject(project.id));

    this.spaces.delete(id);

    const org = this.organizations.get(space.organization_id);

    if (org) {
      this.organizations.set(org.id, {
        ...org,
        spaces: org.spaces.filter(space => space.id !== id),
        updated_at: new Date().toISOString(),
      });
    }

    return true;
  }

  deleteProject(id: string) {
    const project = this.projects.get(id);

    if (!project) {
      return false;
    }

    this.getColumnsByProject(id).forEach(column => this.deleteColumn(column.id));
    this.projects.delete(id);

    const space = this.spaces.get(project.space_id);
    if (space) {
      this.spaces.set(space.id, {
        ...space,
        projects: space.projects.filter(project => project.id !== id),
        updated_at: new Date().toISOString(),
      });
    }

    return true;
  }

  deleteColumn(id: string) {
    const column = this.columns.get(id);

    if (!column) {
      return false;
    }

    this.getTasksByColumn(id).forEach(task => {
      this.tasks.delete(task.id);
    });

    this.columns.delete(id);
    return true;
  }

  deleteTask(id: string) {
    const task = this.tasks.get(id);

    if (!task) {
      return false;
    }

    this.tasks.delete(id);
    return true;
  }

  searchTasks(query: string, spaceId?: string): IColumnTask[] {
    let tasks = Array.from(this.tasks.values());

    if (spaceId) {
      const projectIds = this.getProjectsBySpace(spaceId).map(p => p.id);
      tasks = tasks.filter(task => projectIds.includes(this.getTaskProject(task.id)?.id || ''));
    }

    return tasks.filter(
      task =>
        task.name.toLowerCase().includes(query.toLowerCase()) ||
        task.description?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  getTaskProject(taskId: string): IOrganizationProject | null {
    const task = this.tasks.get(taskId);
    if (!task) {
      return null;
    }

    const column = this.columns.get(task.column_id);
    if (!column) {
      return null;
    }

    return this.projects.get(column.project_id) || null;
  }
}

export const mockDB = new MockDB();

export const delay = <T>(data: T, ms: number = 500): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), ms));
