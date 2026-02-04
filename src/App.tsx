import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import RootLayout from './RootLayout';

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
