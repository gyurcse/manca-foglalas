import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello Vilag | Eskuvo",
  description: "Egyszeru, egyoldalas eskuvoi weboldal programmal es helyszininformaciokkal.",
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
