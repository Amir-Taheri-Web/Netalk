import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { TProps } from "@/types/types";
import "./globals.css";
import { FC } from "react";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netalk",
  description: "Share your thoughts and communicate with others",
};

const RootLayout: FC<TProps> = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en" className="bg-dark-1">
        <body className={`${rubik.className} bg-dark-1 text-white`}>
          {children}
          <Toaster/>
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
