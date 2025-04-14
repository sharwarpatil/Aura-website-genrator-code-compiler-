// "use client";
// import React, { useEffect, useState } from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import Header from "@/components/custom/header";
// import { MessagesContext } from "@/context/MessagesContext";
// import { UserDetailsContext } from "@/context/UserDetailsContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import ConvexClientProvider from "./ConvexClientProvider";
// import { useConvex } from "convex/react";

// function Provider({ children }) {
//   const [messages, setMessages] = useState();
//   const [userDetail, setUserDetail] = useState();
//   const convex = useConvex();
//   useEffect(() => {
//     IsAuthenticated();
//   }, []);
//   const IsAuthenticated = async () => {
//     if (typeof window !== undefined) {
//       const user = JSON.parse(localStorage.getItem("user"));

//       const result = await convex.query(api.users.GetUser, {
//         email: user?.email,
//       });
//       setUserDetail(result);
//       console.log(result);
//     }
//   };
//   return (
//     <div>
//       <ConvexClientProvider>
//         {" "}
//         <GoogleOAuthProvider
//           clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
//         >
//           <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
//             <MessagesContext.Provider value={{ messages, setMessages }}>
//               <NextThemesProvider
//                 attribute="class"
//                 defaultTheme="system"
//                 enableSystem
//                 disableTransitionOnChange
//               >
//                 <Header />
//                 {children}
//               </NextThemesProvider>
//             </MessagesContext.Provider>
//           </UserDetailsContext.Provider>
//         </GoogleOAuthProvider>
//       </ConvexClientProvider>
//     </div>
//   );
// }
// export default Provider;
"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { useConvex } from "convex/react";
import axios from "axios";
import { api } from "@/convex/_generated/api";
// New component to handle Convex-dependent logic
function ConvexWrapper({ children }) {
  const convex = useConvex();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    const IsAuthenticated = async () => {
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.email) {
          const result = await convex.query(api.users.GetUser, {
            email: user.email,
          });
          setUserDetail(result);
        }
      }
    };
    IsAuthenticated();
  }, [convex]); // Add convex as a dependency

  return (
    <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

function Provider({ children }) {
  const [messages, setMessages] = useState();

  return (
    <div>
      <ConvexClientProvider>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
        >
          <ConvexWrapper>
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
          </ConvexWrapper>
        </GoogleOAuthProvider>
      </ConvexClientProvider>
    </div>
  );
}

export default Provider;
