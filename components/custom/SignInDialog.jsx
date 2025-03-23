import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import LookUp from "@/data/LookUp";
import { UserDetailsContext } from "@/context/UserDetailsContext";

function SignInDialog(openDialog, closeDialog) {
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      //save for database
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-white text-2xl">
              {LookUp.SIGNIN_HEADING}
            </h2>
            <DialogDescription className="mt-2 text-center">
              {LookUp.SIGNIN_SUBHEADING}
            </DialogDescription>
            <Button onClick={googleLogin} className="mt-3">
              Sign In With Google
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
