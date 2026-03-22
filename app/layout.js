import './globals.css';
import { Noto_Nastaliq_Urdu, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const urduFont = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-urdu',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});


export const metadata = {
  title: 'Urdu Next.js App',
  description: 'Displaying Urdu text in Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} ${urduFont.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
