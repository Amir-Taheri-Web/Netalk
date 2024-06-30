import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { TProps } from "@/types/types";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netalk",
  description: "Share your thoughts and communicate with others",
};

const RootLayout = ({ children }: TProps) => {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
