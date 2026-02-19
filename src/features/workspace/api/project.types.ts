import { IProjectColumn, DefaultView } from '@/features/board/api/board.types';
import { INamedEntity } from '@/shared/types/entity.types';

export interface IOrganizationProject extends INamedEntity {
  columns?: IProjectColumn[];
  defaultView: DefaultView;
}
