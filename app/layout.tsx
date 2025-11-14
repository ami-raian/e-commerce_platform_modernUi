import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProgressBarProvider } from "@/components/providers/progress-bar-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Marqen - Premium Clothing Bangladesh",
  description:
    "Shop trendy t-shirts, pants, and stylish clothing for men and women at Marqen. Quality fashion delivered across Bangladesh with Cash on Delivery.",
  generator: "next.js",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "Upg29v-LAQWZWqGlXE0bsuAsmHliLFK48WDVD2Smgw0",
  },
  openGraph: {
    title: "Marqen - Premium Clothing Bangladesh",
    description:
      "Shop trendy t-shirts, pants, and stylish clothing for men and women at Marqen. Quality fashion delivered across Bangladesh with Cash on Delivery.",
    url: "https://www.marqenbd.com",
    siteName: "Marqen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marqen - Premium Clothing Bangladesh",
    description:
      "Shop trendy t-shirts, pants, and stylish clothing for men and women at Marqen. Quality fashion delivered across Bangladesh with Cash on Delivery.",
  },
  keywords: [
    "clothing Bangladesh",
    "t-shirts",
    "pants",
    "fashion",
    "Marqen",
    "cash on delivery",
    "men's clothing",
    "women's clothing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={null}>
              <ProgressBarProvider />
            </Suspense>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
