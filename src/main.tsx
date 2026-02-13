'use client';
import { StrictMode, Suspense } from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { routes } from './routes/routes';
import './lib/i18n/i18n';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="...Loading">
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>,
);
