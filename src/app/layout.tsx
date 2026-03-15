import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manca Takarítás | Időpontfoglalás",
  description: "Modern, egyszerű foglaló oldal Manca takarító szolgáltatásaihoz.",
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
