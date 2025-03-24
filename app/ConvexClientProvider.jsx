import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function ConvexClientProvider({ children }) {
  // Fix children destructuring
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export default ConvexClientProvider;
