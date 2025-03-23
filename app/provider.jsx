"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </NextThemesProvider>
          </MessagesContext.Provider>
        </UserDetailsContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}
export default Provider;
