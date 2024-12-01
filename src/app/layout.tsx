import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "User List on NextJS",
  description: "Created by Ruben Duarte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 p-4 min-h-screen`}
      >
        <header className="p-4">
          <h1 className="text-2xl text-gray-400 font-bold text-center">User LIst</h1>
        </header>
        <main className="my-10">
          {children}
        </main>
        <footer>
          
        </footer>
      </body>
    </html>
  );
}
