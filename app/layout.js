import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CompareFi - Compare Financial Products',
  description: 'Compare credit cards, savings accounts, loans, and more. Find the best financial products for your needs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}