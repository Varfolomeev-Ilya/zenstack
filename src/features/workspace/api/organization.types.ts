import { IOrganizationSpace } from './workspace.types';

import { IUserShort } from '@/features/user/api/user-api.types';
import { INamedEntity } from '@/shared/types/entity.types';

export interface IOrganization extends INamedEntity {
  owner: IUserShort;
  members: IUserShort[];
  spaces: IOrganizationSpace[];
}

export interface ICreateOrganizationSpaceRequest {
  orgId: string;
  name: string;
  description?: string;
}

export interface IUpdateOrganizationRequest {
  organizationId: string;
  name?: string;
  description?: string;
}
