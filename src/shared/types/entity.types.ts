export interface IBaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface INamedEntity extends IBaseEntity {
  name: string;
  description?: string;
}
