import { AuthError } from '@supabase/supabase-js';
import i18next from 'i18next';

export const handleSupabaseResponse = async <T>(
  promise: Promise<{ data: T | null; error: null | AuthError }>,
): Promise<T> => {
  const { data, error } = await promise;

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(i18next.t('errors:NO_DATA_RETURNED'));
  }

  return data;
};
