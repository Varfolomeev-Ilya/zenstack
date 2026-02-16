'use client';
import { StrictMode, Suspense } from 'react';

import { routes } from '@app/routes/routes';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@app/i18n/i18n';
import '@app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="...Loading">
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>,
);
