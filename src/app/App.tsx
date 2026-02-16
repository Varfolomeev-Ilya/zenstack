'use client';
import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import RootLayout from './layouts/RootLayout/RootLayout';

function App() {
  return (
    <RootLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </RootLayout>
  );
}

export default App;
