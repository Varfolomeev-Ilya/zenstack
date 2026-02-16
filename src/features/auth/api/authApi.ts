import { supabase } from '@shared/api/supabase';

import { TAuthResponse, TOauthResponse, TUserResponse } from '../model/types';

import { AUTH_CALLBACK_LINK, CONFIRM_EMAIL_LINK } from '@/shared/constants';
import { handleSupabaseResponse } from '@/shared/lib/api/handleSupabaseResponse';

export const supabaseAuthClient = {
  signInWithEmail: (email: string, password: string) =>
    handleSupabaseResponse<TAuthResponse>(supabase.auth.signInWithPassword({ email, password })),

  signInWithGoogle: () =>
    handleSupabaseResponse<TOauthResponse>(
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: AUTH_CALLBACK_LINK },
      }),
    ),

  signUpWithEmail: (email: string, password: string) =>
    handleSupabaseResponse<TAuthResponse>(
      supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: CONFIRM_EMAIL_LINK,
          data: { email_confirm: true },
        },
      }),
    ),

  resendConfirmationEmail: (email: string) =>
    handleSupabaseResponse(
      supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: CONFIRM_EMAIL_LINK },
      }),
    ),

  resetPasswordForEmail: (email: string) =>
    handleSupabaseResponse(
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: AUTH_CALLBACK_LINK,
      }),
    ),

  getUser: () => handleSupabaseResponse<TUserResponse>(supabase.auth.getUser()),

  getSession: () => supabase.auth.getSession(),

  signOut: () => supabase.auth.signOut(),
};
