"use client";

import { ThemeContextProvider } from '@/context/ThemeContext';

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
