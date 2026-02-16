import { AxiosError } from 'axios';

import { convertArrayBufferToObj } from '../helpers/convertArrayBufferToObj';

export const getAxiosErrObj = (err: AxiosError) => {
  if (err.response?.data instanceof ArrayBuffer) {
    const errObj = convertArrayBufferToObj(err.response.data);

    return errObj;
  }

  return err.response?.data;
};
