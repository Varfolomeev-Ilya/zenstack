import { delay, mockDB } from './mocks';
import {
  ICreateOrganizationProjectRequest,
  IUpdateOrganizationProjectRequest,
} from './project.types';

export const projectApi = {
  getAllSpaceProjects: async (spaceId: string) => {
    const projects = mockDB.getProjectsBySpace(spaceId);
    return delay(projects);
  },

  getProject: async (projectId: string) => {
    const project = mockDB.getProjectFull(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return delay(project);
  },

  createProject: async (payload: ICreateOrganizationProjectRequest) => {
    const newProject = mockDB.createProject(payload);
    return delay(newProject);
  },

  updateProject: async (payload: IUpdateOrganizationProjectRequest) => {
    const project = mockDB.updateProject(payload);
    if (!project) {
      throw new Error('Project not found');
    }
    return delay(project);
  },
};

//  createTask: async (
//     columnId: string,
//     data: { title: string; description?: string; creator: IUserShort },
//   ) => {
//     const column = mockDB['columns'].get(columnId);
//     if (!column) {
//       throw new Error('Column not found');
//     }

//     const newTask = mockDB.createTask({
//       name: data.title,
//       description: data.description,
//       column_id: columnId,
//       creator: data.creator,
//       order: column.tasks.length,
//     });

//     return delay(newTask);
//   },

//   moveTask: async (taskId: string, targetColumnId: string, newOrder: number, name: string) => {
//     const task = mockDB.updateTask({
//       id: taskId,
//       column_id: targetColumnId,
//       order: newOrder,
//       name,
//     });

//     if (!task) {
//       throw new Error('Task not found');
//     }

//     return delay(task);
//   },
