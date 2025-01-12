import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata for SEO
export const metadata: Metadata = {
  title: "PersonaForge",
  description: "A modern blog built with Next.js and styled beautifully.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 text-gray-900`}
      >
        {/* Header */}
        <header className="bg-black text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">PersonaForge</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} My Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}