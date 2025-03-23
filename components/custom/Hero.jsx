"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import { ArrowRight } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";

function Hero() {
  const { userInput, setUserInput } = useState("");
  const { messages, setMessages } = useState(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  const [openDialog, setOpenDialog] = useState(false);
  const onGenerate = (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    setMessages({
      role: "user",
      content: input,
    });
  };

  return (
    <div className=" flex flex-col items-center mt-36 xl:mt42 gap-2">
      <h2>{LookUp.HERO_HEADING}</h2>
      <p className="text-gray-300 font-medium">{LookUp.HERO_DESC}</p>
      <div
        className="p-5 border rounded-xl max-w-xl w-full"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className=" flex gap-2">
          <textarea
            placeholder={LookUp.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className=" outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          <ArrowRight
            onClick={() => onGenerate(userInput)}
            className=" bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer "
          />
        </div>
      </div>
      <div className=" flex flex-wrap max-w-2xl items-center justify-center mt-7">
        {LookUp?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            className="p-1 px-2 border rounded-full text-gray-400 hover:text-white cursor-pointer"
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(false)}
      />
    </div>
  );
}

export default Hero;
