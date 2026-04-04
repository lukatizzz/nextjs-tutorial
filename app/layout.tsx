import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "sonner";
import AppProvider from "@/components/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";

const inter = Inter({ subsets: ['vietnamese'] })


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken}>
            <Header />
            {children}
            <SlideSession />
          </AppProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
