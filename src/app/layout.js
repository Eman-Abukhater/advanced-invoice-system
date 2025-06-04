"use client";

import { ThemeContextProvider } from '@/context/ThemeContext';
import { SessionProvider } from "next-auth/react";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

      <SessionProvider>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </SessionProvider>
      </body>
    </html>
  );
}
