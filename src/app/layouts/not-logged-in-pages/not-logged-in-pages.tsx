import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Spinner } from '@/shared/ui/spinner/spinner';

const NotLoggedInPages = () => {
  return (
    <>
      <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default NotLoggedInPages;
