import { ThemeContextProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'Advanced Invoice System',
  description: 'Professional ERP Invoice App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
