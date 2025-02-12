import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/utils';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'breathe',
  description: 'An application to practice simple breathwork exercises',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`pt-10 px-10 antialiased bg-blue-50`, roboto.className)}
      >
        {children}
      </body>
    </html>
  );
}
