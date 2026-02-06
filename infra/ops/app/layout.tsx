import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WHY MBA 360",
  description: "Lead management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
