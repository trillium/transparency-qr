import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./animate.css";
import "./circle-picker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Code generator",
  authors: [{ name: "Trillium Smith", url: "https://www.trilliumsmith.com" }],
  description:
    "A tool to generate QR codes and download them in PNG or SVG format.",
  keywords: ["QR Code Generator", "Create QR Codes", "Free QR Code Generator"],
  publisher: "Trillium Smith",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/icon-light.svg",
        href: "/images/icon-light.svg",
        type: "image/svg+xml",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/icon-dark.svg",
        href: "/images/icon-dark.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
