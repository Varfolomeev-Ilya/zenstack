'use client';
import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import RootLayout from './layouts/RootLayout/RootLayout';

import { Spinner } from '@/shared/ui/spinner';

function App() {
  return (
    <RootLayout>
      <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />}>
        <Outlet />
      </Suspense>
    </RootLayout>
  );
}

export default App;
