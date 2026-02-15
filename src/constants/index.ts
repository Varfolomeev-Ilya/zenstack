export const ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/create-account',
  HOME: '/home',
  AUTH_CALLBACK: '/auth/callback',
  CONFIRM_EMAIL: '/confirm-email',
  LINK_EXPIRED: '/link-expired',
};

export const CONFIRM_EMAIL_LINK = window.location.origin + ROUTES.CONFIRM_EMAIL;
