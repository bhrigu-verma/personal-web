import type { Metadata } from "next";
import "./globals.css";

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Developer";

export const metadata: Metadata = {
  title: `${username} — 3D Portfolio`,
  description: `Interactive 3D portfolio for ${username}. Explore projects, stats, and more.`,
  openGraph: {
    title: `${username} — 3D Portfolio`,
    description: `Interactive 3D portfolio for ${username}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#030712] text-gray-100">
        {children}
      </body>
    </html>
  );
}
