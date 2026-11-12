import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Protidiner Sunnah - প্রতিদিনের সুন্নাহ',
  description: 'A modern, multilingual Islamic digital library and free online ebook reading platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
