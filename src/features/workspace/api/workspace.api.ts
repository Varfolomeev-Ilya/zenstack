import { IOrganizationProject } from './project.types';

import { INamedEntity } from '@/shared/types/entity.types';

export interface IOrganizationSpace extends INamedEntity {
  projects?: IOrganizationProject[];
  bgUrl?: string;
}
