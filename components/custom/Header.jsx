import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UserDetailsContext } from "@/context/UserDetailsContext";
function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.svg"} alt="none" width={60} height={60}></Image>
      {/* {userDetail.name && ( */}
      <div className=" flex gap-5">
        <Button>Sign In</Button>
        <Button>Get Started</Button>
      </div>
      {/* )} */}
    </div>
  );
}

export default Header;
