import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pillowSTAT | Professional Housing for Traveling Nurses",
  description: "Quiet, comfortable, and professionally managed housing for traveling nurses and healthcare professionals. Monthly rentals from 8-26 weeks.",
  keywords: "travel nurse housing, nurse accommodation, healthcare professional housing, medium-term rental",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
