import Codeview from "@/components/custom/Codeview";
import React from "react";
import Chatview from "@/components/custom/Chatview";
function Workspace() {
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <Chatview />
        <div className=" pl-16 col-span-3">
          <Codeview />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
