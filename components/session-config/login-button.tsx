import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export const LoginButtonClient = () => {
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
      disabled={status === "loading" || isLoading}
      onClick={handleSignIn}
    >
      {status === "loading" || isLoading ? <Spinner /> : "Connect to Pinterest"}
    </Button>
  );
};
