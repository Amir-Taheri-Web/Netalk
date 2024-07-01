"use client";

import { TProps } from "@/types/types";
import { ClerkProvider } from "@clerk/nextjs";
import React, { FC } from "react";

const AuthProvider: FC<TProps> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthProvider;
