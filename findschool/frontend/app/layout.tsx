import type { Metadata } from 'next';
import { Navigation } from './components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'GoSchool - Ecoles, cours et formations',
  description:
    'GoSchool aide les eleves et familles a comparer les ecoles, cours et formations au Congo, au Cameroun et au Senegal.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
