"use client";

import { TProps } from "@/types/types";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React, { FC } from "react";

const AuthProvider: FC<TProps> = ({ children }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/assets/logo.png",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#877EFF",
          colorBackground: "#121417",
          colorInputBackground: "#1F1F22",
          colorInputText: "#fff",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
