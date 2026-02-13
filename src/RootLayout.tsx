'use client';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full px-4 py-8">{children}</main>
    </>
  );
}
