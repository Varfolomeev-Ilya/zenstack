import { AuthResponse, OAuthResponse, UserResponse } from '@supabase/supabase-js';

export type TAuthResponse = AuthResponse['data'];
export type TOauthResponse = OAuthResponse['data'];
export type TUserResponse = UserResponse['data'];
export interface IApiErrorResponse {
  error: {
    message?: string;
    code: number;
    detail?: string;
  };
}
