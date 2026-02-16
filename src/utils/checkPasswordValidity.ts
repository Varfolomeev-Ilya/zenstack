import i18n from 'i18next';
import * as z from 'zod';

export interface IPasswordValidityCriteria {
  eightCharacters: boolean;
  oneCapital: boolean;
  oneNumber: boolean;
  latinOnly: boolean;
  oneSpecSymbol: boolean;
}

export const checkPasswordValidity = (
  password: string | number | readonly string[] | undefined,
): IPasswordValidityCriteria => {
  if (!password) {
    return {
      eightCharacters: false,
      oneCapital: false,
      oneNumber: false,
      latinOnly: false,
      oneSpecSymbol: false,
    };
  }

  const stringPassword = String(password);
  const isCyrillic = RegExp(/[а-яА-Я]/).test(stringPassword);
  const isSpecialSymbol = RegExp(/[^a-zA-Zа-яА-Я0-9]/).test(stringPassword);
  const isOneCapital = RegExp(/[A-Z]/).test(stringPassword);
  const isOneNumber = RegExp(/[0-9]/).test(stringPassword);

  return {
    eightCharacters: stringPassword.length >= 8,
    oneCapital: isOneCapital,
    oneNumber: isOneNumber,
    latinOnly: !isCyrillic,
    oneSpecSymbol: isSpecialSymbol,
  };
};

export const passwordValidation = z
  .string()
  .max(30, i18n.t('errors:PASSWORD_MAX_LENGTH'))
  .refine(val => checkPasswordValidity(val).eightCharacters, {
    message: i18n.t('errors:PASSWORD_MIN_LENGTH'),
  })
  .refine(val => checkPasswordValidity(val).latinOnly, {
    message: i18n.t('errors:PASSWORD_LATIN_ONLY'),
  })
  .refine(val => checkPasswordValidity(val).oneCapital, {
    message: i18n.t('errors:PASSWORD_ONE_CAPITAL'),
  })
  .refine(val => checkPasswordValidity(val).oneNumber, {
    message: i18n.t('errors:PASSWORD_ONE_NUMBER'),
  })
  .refine(val => checkPasswordValidity(val).oneSpecSymbol, {
    message: i18n.t('errors:PASSWORD_ONE_SYMBOL'),
  });
