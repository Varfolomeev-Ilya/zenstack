import { supabase } from './supabase';

const signInWithGoogle = async () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
};

const signInWithEmail = async (email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
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

export { signInWithGoogle, signInWithEmail, getUser, getSession, signOut };
