import {
  ICreateOrganizationProjectRequest,
  IOrganizationProject,
  IUpdateOrganizationProjectRequest,
} from '../api/project.types';

interface IProjectState {
  projects: IOrganizationProject[] | null;
}

interface IProjectActions {
  getAllSpaceProjects: (spaceId: string) => void;
  getProject: (projectId: string) => void;
  createProject: (payload: ICreateOrganizationProjectRequest) => void;
  updateProject: (projects: IUpdateOrganizationProjectRequest) => void;
}

export type TProjectStore = IProjectState & IProjectActions;
