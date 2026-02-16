import { type FC } from 'react';

import { ToastContainer, Slide } from 'react-toastify';

const Toast: FC = () => {
  return (
    <ToastContainer
      hideProgressBar
      transition={Slide}
      theme="colored"
      autoClose={4000}
      position="top-right"
    />
  );
};

export default Toast;
