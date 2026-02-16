import i18n from 'i18next';
import * as z from 'zod';

export const emailValidation = z
  .email({
    message: i18n.t('errors:INCORRECT_EMAIL'),
  })
  .min(5, i18n.t('errors:EMAIL_MIN_LENGTH'))
  .max(50, i18n.t('errors:EMAIL_MAX_LENGTH'));
