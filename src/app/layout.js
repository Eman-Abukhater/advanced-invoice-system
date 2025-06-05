"use client";

import { ThemeContextProvider } from '@/context/ThemeContext';
import { SessionProvider } from "next-auth/react";
import { Providers } from './providers';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionProvider>
            <ThemeContextProvider>
              {children}
            </ThemeContextProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
