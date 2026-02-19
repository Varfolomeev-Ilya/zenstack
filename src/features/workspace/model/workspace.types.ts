import {
  IGetOrganizationSpacesRequest,
  IOrganizationSpace,
  IRemoveSpaceFromOrganizationRequest,
} from '../api/workspace.types';

interface IWorkspaceState {
  spaces: IOrganizationSpace[] | null;
}

interface IWorkspaceActions {
  getOrganizationSpaces: (spaceId: string) => Promise<void>;
  addSpaceToOrganization: (payload: IGetOrganizationSpacesRequest) => Promise<void>;
  removeSpaceFromOrganization: (payload: IRemoveSpaceFromOrganizationRequest) => Promise<void>;
}

export type TWorkspaceStore = IWorkspaceState & IWorkspaceActions;
