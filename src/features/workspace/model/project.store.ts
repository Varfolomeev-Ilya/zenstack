import { create } from 'zustand';

import { projectApi } from '../api/project.api';
import {
  ICreateOrganizationProjectRequest,
  IUpdateOrganizationProjectRequest,
} from '../api/project.types';

import { TProjectStore } from './project.types';

export const useProjectStore = create<TProjectStore>((set, get) => ({
  projects: null,

  getAllSpaceProjects: async (spaceId: string) => {
    const projects = await projectApi.getAllSpaceProjects(spaceId);
    set({ projects });
  },

  getProject: async (projectId: string) => {
    const project = await projectApi.getProject(projectId);

    const curProject = get().projects;

    if (!curProject) {
      return;
    }

    const updatedProjects = curProject.map(p => {
      if (p.id === project.id) {
        return project;
      }
      return p;
    });

    set({ projects: updatedProjects });
  },

  createProject: async (payload: ICreateOrganizationProjectRequest) => {
    const response = await projectApi.createProject(payload);

    const currProjects = get().projects;
    set({ projects: [...(currProjects || []), response] });
  },

  updateProject: async (payload: IUpdateOrganizationProjectRequest) => {
    const response = await projectApi.updateProject(payload);

    const currProjects = get().projects;

    const updatedProjects = currProjects?.map(p => {
      if (p.id === response.id) {
        return response;
      }
      return p;
    });

    set({ projects: updatedProjects });
  },
}));
