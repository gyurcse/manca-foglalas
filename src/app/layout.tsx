import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manca Takaritas | Idopontfoglalas",
  description: "Modern, egyszeru foglalo oldal Manca takarito szolgaltatasaihoz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
