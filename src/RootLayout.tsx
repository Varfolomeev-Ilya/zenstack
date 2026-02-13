'use client';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full min-h-full px-4 py-8 bg-background text-foreground">{children}</main>
    </>
  );
}
