"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ConvexClientProvider from "./ConvexClientProvider";
function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const isAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      //Fetch from db
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });
      setUserDetail(result);
      console.log(result);
    }
  };
  return (
    <div>
      <ConvexClientProvider>
        {" "}
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
      </ConvexClientProvider>
    </div>
  );
}
export default Provider;
