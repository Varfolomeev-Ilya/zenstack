import { supabase } from './supabase';

import { CONFIRM_EMAIL_LINK } from '@/constants';

const signInWithGoogle = async () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
};

const signUpWithEmail = async (email: string, password: string, redirectUrl: string) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        email_confirm: true,
      },
    },
  });
};

const signInWithEmail = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const resendConfirmationEmail = async (email: string) => {
  return supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: CONFIRM_EMAIL_LINK,
    },
  });
};

const getUser = async () => {
  return supabase.auth.getUser();
};

const getSession = async () => {
  return supabase.auth.getSession();
};

const signOut = async () => {
  return supabase.auth.signOut();
};

export {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  getUser,
  getSession,
  signOut,
  resendConfirmationEmail,
};
