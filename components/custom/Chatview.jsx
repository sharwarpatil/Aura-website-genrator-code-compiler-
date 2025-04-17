// "use client";
// import { useParams } from "next/navigation";
// import React, { useContext, useEffect } from "react";
// import { useConvex } from "convex/react";
// import { GetWorkspace } from "@/convex/workspace";
// import { api } from "@/convex/_generated/api";
// import { MessagesContext } from "@/context/MessagesContext";
// function Chatview() {
//   const { id } = useParams();
//   const convex = useConvex();
//   const { message, setMessages } = useContext(MessagesContext);
//   useEffect(() => {
//     id && GetWorkspaceData();
//   });
//   const GetWorkspaceData = async () => {
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: id,
//     });
//     setMessages(result?.message);
//     // console.log(result);
//     console.log("API Response:", result);
//     console.log("Messages:", result?.message);
//   };
//   return (
//     <div>
//       <div>
//         {message?.map((msg, index) => (
//           <div key={index}>{msg.content}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chatview;
"use client";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useConvex } from "convex/react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { ArrowRight } from "lucide-react";
import LookUp from "@/data/LookUp";
import Prompt from "@/data/Prompt";
import axios from "axios";

function Chatview() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailsContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (id) GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });

    setMessages(Array.isArray(result?.message) ? [...result.message] : []);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastRole = messages[messages.length - 1].role;
      if (lastRole === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

    try {
      const result = await axios.post("/api/ai-chat", { prompt: PROMPT });

      if (result?.data?.error) {
        console.error("AI API Error:", result.data.error);
        return;
      }

      const aiReply = result.data.result;

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: aiReply,
        },
      ]);
    } catch (error) {
      console.error("Request failed:", error.message || error);
    }
  };

  const onGenerate = (input) => {
    if (!input) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);

    setUserInput("");
  };

  return (
    <div className="relative h-[80vh] flex flex-col w-[25vw] ">
      <div className="flex-1 overflow-y-scroll ">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              className="p-3 rounded-lg gap-2 mb-4"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
              key={index}
            >
              {msg.role === "user" && userDetail?.picture && (
                <Image
                  src={userDetail.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full inline-block mr-2"
                />
              )}
              <span>{msg.content}</span>
            </div>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </div>
      <div
        className="p-5 border rounded-xl max-w-xl w-full"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            value={userInput}
            placeholder={LookUp.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          <ArrowRight
            onClick={() => onGenerate(userInput)}
            className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Chatview;
