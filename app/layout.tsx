import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Quiz Platform",
  description: "Experience high-performance, real-time validated quizzes from Excel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
