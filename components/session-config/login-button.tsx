"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";

export const LoginButton = () => {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("pinterest");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={status === "loading"}
      onClick={handleSignIn}
    >
      {status === "loading" || isLoading ? <Spinner /> : "Connect to Pinterest"}
    </Button>
  );
};
