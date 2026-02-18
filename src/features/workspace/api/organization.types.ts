import { IOrganizationSpace } from './workspace.api';

import { IUserShort } from '@/features/user/api/user-api.types';
import { INamedEntity } from '@/shared/types/entity.types';

export interface IOrganization extends INamedEntity {
  owner: IUserShort;
  members: string[];
  projects: IOrganizationSpace[];
}
