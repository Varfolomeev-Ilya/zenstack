import { IUserProfile } from './types';

import { supabase } from '@/shared/api/supabase';

export const supabaseUserClient = {
  getUserProfile: (userId: string) =>
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
  updateUserProfile: (userId: string, updates: Partial<IUserProfile>) =>
    supabase.from('profiles').update(updates).eq('id', userId).select().single<IUserProfile>(),
};
