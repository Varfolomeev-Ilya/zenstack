import { IProjectColumn, DefaultView } from '@/features/board/api/board.types';
import { INamedEntity } from '@/shared/types/entity.types';

export interface IOrganizationProject extends INamedEntity {
  columns?: IProjectColumn[];
  defaultView: DefaultView;
  space_id: string;
}

export interface ICreateOrganizationProjectRequest {
  name: string;
  space_id: string;
  description?: string;
  defaultView: DefaultView;
}

export interface IUpdateOrganizationProjectRequest {
  id: string;
  name?: string;
  description?: string;
  defaultView?: DefaultView;
}
