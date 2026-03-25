import './globals.css';
import { Noto_Nastaliq_Urdu, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';

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
  title: "Catholic Urdu & English Bible App",
  description: "This is my English and Urdu Catholic Bible App",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${urduFont.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar /> */}
          <Breadcrumbs />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
