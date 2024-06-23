"use client";

import { useSearchParams } from "next/navigation";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl }); // 'google'プロバイダーを使用してサインインを開始
  };
  return (
    <Button onClick={handleGoogleSignIn}>
      <FcGoogle size={20} className="mr-2" />
      Google
    </Button>
  );
};

export default GoogleButton;
