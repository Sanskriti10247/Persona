import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Quicksand, Nunito } from "next/font/google";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const globalStyles = readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf8");

export const metadata: Metadata = {
  title: "Personafy 🎀",
  description: "A refined persona chat experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        {children}
      </body>
    </html>
  );
}
