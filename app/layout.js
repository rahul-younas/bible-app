import './globals.css';
import { Noto_Nastaliq_Urdu, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  title: "Urdu & English Catholic Bible",
  description: "Read the Holy Bible in English and Urdu with a simple, easy-to-use app. Switch languages effortlessly and explore Scripture anytime for daily reading and reflection.",
  manifest: "/manifest.json?v=2",
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
          <Navbar />
          <Breadcrumbs />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
