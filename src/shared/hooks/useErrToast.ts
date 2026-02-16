import { useCallback } from 'react';

import { AxiosError, CanceledError } from 'axios';
import i18next from 'i18next';
import { toast } from 'react-toastify';

import { IApiErrorResponse } from '@/features/auth/model/types';
import { getAxiosErrObj } from '@/shared/lib/api/getAxiosErrObj';

const isApiErrorResponse = (err: unknown): err is IApiErrorResponse => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'error' in err &&
    typeof (err as IApiErrorResponse).error === 'object'
  );
};

export const useErrToast = () => {
  const showDefaultErrToast = useCallback((errText: string) => {
    toast.error(`Error: ${errText}`);
  }, []);

  const checkApiErr = useCallback(
    (err: IApiErrorResponse | undefined) => {
      if (!err?.error) {
        showDefaultErrToast(JSON.stringify(err));
        return;
      }

      const { code, message, detail } = err.error;
      const errorParts = [message, detail].filter(Boolean);
      const errorText = `${code}: ${errorParts.join(' - ') || i18next.t('errors:UNKNOWN_ERROR')}`;

      showDefaultErrToast(errorText);
    },
    [showDefaultErrToast],
  );

  const showErrToast = useCallback(
    (err: unknown) => {
      if (err instanceof CanceledError) {
        return;
      }

      if (err instanceof AxiosError) {
        const errData = getAxiosErrObj(err);
        const data: IApiErrorResponse = {
          error: {
            code: errData?.code ?? errData?.status ?? 500,
            message: errData?.msg ?? errData?.title,
            detail: errData?.detail,
          },
        };
        checkApiErr(data);
        return;
      }

      if (err instanceof Error) {
        showDefaultErrToast(err.message);
        return;
      }

      if (isApiErrorResponse(err)) {
        checkApiErr(err);
        return;
      }

      if (typeof err === 'string') {
        showDefaultErrToast(err);
        return;
      }

      if (err && typeof err === 'object' && 'message' in err) {
        showDefaultErrToast(String(err.message));
        return;
      }

      showDefaultErrToast(i18next.t('errors:UNKNOWN_ERROR'));
    },
    [checkApiErr, showDefaultErrToast],
  );

  return { showErrToast };
};
