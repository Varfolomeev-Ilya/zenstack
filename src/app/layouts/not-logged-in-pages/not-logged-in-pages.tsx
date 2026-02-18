import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Spinner } from '@/shared/ui/spinner/spinner';

const NotLoggedInPages = () => {
  return (
    <div className="px-4 py-8 h-full">
      <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default NotLoggedInPages;
