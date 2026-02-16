'use client';
import { StrictMode, Suspense } from 'react';

import { routes } from '@app/routes/routes';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@app/i18n/i18n';
import '@app/styles/index.css';
import { Spinner } from './shared/ui/spinner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />}>
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>,
);
