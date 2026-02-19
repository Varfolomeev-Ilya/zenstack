import {
  ICreateOrganizationSpaceRequest,
  IOrganization,
  IUpdateOrganizationRequest,
} from '../api/organization.types';

interface IOrganizationState {
  organization: IOrganization | null;
}

interface IOrganizationActions {
  getOrganization: (organizationId: string) => Promise<void>;
  updataOrganization: (payload: IUpdateOrganizationRequest) => Promise<void>;
  createOrganizationSpace: (payload: ICreateOrganizationSpaceRequest) => Promise<void>;
}

export type TOrganizationStore = IOrganizationState & IOrganizationActions;
