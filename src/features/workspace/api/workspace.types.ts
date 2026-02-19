import { IOrganizationProject } from './project.types';

import { INamedEntity } from '@/shared/types/entity.types';

export interface IOrganizationSpace extends INamedEntity {
  organization_id: string;
  projects: IOrganizationProject[];
  bgUrl?: string;
}

export interface IGetOrganizationSpacesRequest {
  organizationId: string;
  name: string;
  description?: string;
}

export interface IRemoveSpaceFromOrganizationRequest {
  organizationId: string;
  spaceId: string;
}
