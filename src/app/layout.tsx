import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import AiAssistantDrawer from '@/components/AiAssistantDrawer';
import { LanguageProvider } from '@/components/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ThetaCure — Your Health, Simplified.',
  description: 'Connect with trusted doctors, verified hospitals, and book diagnostic tests across Bangladesh. For the Ones You Love. For the Care They Deserve.',
  icons: {
    icon: '/images/thetacure_icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-[#111827] font-sans antialiased selection:bg-red-50 selection:text-[#D91F2B] pb-14 md:pb-0">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AiAssistantDrawer />
          <MobileBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
