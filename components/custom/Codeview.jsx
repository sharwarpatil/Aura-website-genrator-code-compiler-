// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import RenderResult from "next/dist/server/render-result";
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackCodeEditor,
//   SandpackPreview,
//   SandpackFileExplorer,
// } from "@codesandbox/sandpack-react";
// import LookUp from "@/data/LookUp";
// import Prompt from "@/data/Prompt";
// import { MessagesContext } from "@/context/MessagesContext";
// import axios from "axios";
// function Codeview() {
//   const [activeTab, setActiveTab] = useState("code");
//   const [files, setFiles] = useState(LookUp?.DEFAULT_FILE);
//   const { messages, setMessages } = useContext(MessagesContext);
//   useEffect(() => {
//     if (messages?.length) {
//       const role = messages[messages?.length - 1].role;
//       if (role == "user") {
//         GenerateAiCode();
//       }
//     }
//   });
//   const GenerateAiCode = async () => {
//     const PROMPT =
//       messages[messages?.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
//     const result = await axios.post("/api/gen-ai-code", {
//       prompt: PROMPT,
//     });
//     console.log(RenderResult.data);
//     const aiResp = result.data;
//     const mergedFiles = { ...LookUp.DEFAULT_FILE, ...aiResp?.files };
//     setFiles(mergedFiles);
//   };
//   return (
//     <div>
//       <div className=" bg-[#181818] w-full p-2 border ">
//         <div className=" flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 rounded-full">
//           <h2
//             onClick={() => {
//               setActiveTab("code");
//             }}
//             className={`text-sm cursor-pointer p-1 px-2 ${activeTab == "code" && "text-blue-500 bg-blue-50 bg-opacity-25 p-1 px-2 rounded-full"}`}
//           >
//             Code
//           </h2>
//           <h2
//             onClick={() => {
//               setActiveTab("preview");
//             }}
//             className={`text-sm cursor-pointer p-1 px-2 ${activeTab == "preview" && "text-blue-500 bg-blue-50 bg-opacity-25 p-1 px-2 rounded-full"}`}
//           >
//             Preview
//           </h2>
//         </div>
//       </div>
//       <SandpackProvider
//         template="react"
//         theme={"dark"}
//         customSetup={{
//           dependencies: {
//             ...LookUp.DEPENDANCY,
//           },
//         }}
//         options={{
//           externalResources: ["https://cdn.tailwindcss.com/"],
//         }}
//       >
//         <SandpackLayout>
//           {activeTab == "code" ? (
//             <>
//               <SandpackFileExplorer style={{ height: "80vh" }} />
//               <SandpackCodeEditor style={{ height: "80vh" }} />
//             </>
//           ) : (
//             <>
//               <SandpackPreview style={{ height: "80vh" }} />
//             </>
//           )}
//         </SandpackLayout>
//       </SandpackProvider>
//     </div>
//   );
// }

// export default Codeview;
"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import LookUp from "@/data/LookUp";
import Prompt from "@/data/Prompt";
import { MessagesContext } from "@/context/MessagesContext";
import axios from "axios";

function Codeview() {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(LookUp?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    if (messages?.length) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [messages]); // Added dependency array to prevent infinite loops

  const GenerateAiCode = async () => {
    const PROMPT =
      messages[messages?.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
    try {
      const result = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });
      console.log(result.data); // Fixed variable name from RenderResult to result
      const aiResp = result.data;
      const mergedFiles = { ...LookUp.DEFAULT_FILE, ...aiResp?.files };
      setFiles(mergedFiles);
    } catch (error) {
      console.error("Error generating AI code:", error);
    }
  };

  return (
    <div className=" w-[60vw]  ">
      <div className="bg-[#181818] w-full p-2 border ">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 rounded-full">
          <h2
            onClick={() => {
              setActiveTab("code");
            }}
            className={`text-sm cursor-pointer p-1 px-2 ${
              activeTab == "code" &&
              "text-blue-500 bg-blue-50 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => {
              setActiveTab("preview");
            }}
            className={`text-sm cursor-pointer p-1 px-2 ${
              activeTab == "preview" &&
              "text-blue-500 bg-blue-50 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        files={files} // Added files state to SandpackProvider
        customSetup={{
          dependencies: {
            ...LookUp.DEPENDANCY,
          },
        }}
        
        options={{
          externalResources: ["https://cdn.tailwindcss.com/"],
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview style={{ height: "80vh" }} />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default Codeview;
