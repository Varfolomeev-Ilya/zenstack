import { INamedEntity } from '@/shared/types/entity.types';

export interface IUserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface IUserShort extends INamedEntity {
  avatar_url?: string;
  email: string;
}
