import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { Eclipse } from "lucide-react";
import { auth, signIn, signOut } from "@/auth";

export async function Header() {
  const session = await auth();
  console.log({
    session,
  });

  return (
    <div className="h-[64px] flex items-center justify-between">
      <Link href="/app">
        <Button variant="ghost" size="sm" className="p-0">
          <H3>Pose Pulse</H3>
        </Button>
      </Link>
      <div className="flex items-center space-x-2">
        {!session?.user ? <SignInButton /> : <SignOutButton />}
        <Button variant="ghost" size="icon" type="button">
          <Eclipse />
        </Button>
      </div>
    </div>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("pinterest", { redirectTo: "/app" });
      }}
    >
      <Button variant="outline" type="submit">
        Connect to Pinterest
      </Button>
    </form>
  );
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="outline" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
