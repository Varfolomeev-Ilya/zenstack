'use client';

import Header from '@/features/auth/ui/Header/Header';
import Toast from '@/features/auth/ui/Toast/Toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = true;
  return (
    <div className="w-full min-h-full">
      <Toast />
      {isLoggedIn && <Header />}
      <main className=" px-4 py-8 bg-background text-foreground">{children}</main>
    </div>
  );
}
