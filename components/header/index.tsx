import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { auth, signIn, signOut } from "@/auth";
import { ThemeSelect } from "@/components/theme/toggle-button";

export async function Header() {
  const session = await auth();

  return (
    <div className="h-[64px] flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Button variant="link" size="sm" className="p-0">
            <H3>Pose Pulse</H3>
          </Button>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {!session?.user ? <LoginButtonServer /> : <LogoutButtonServer />}
        <ThemeSelect />
      </div>
    </div>
  );
}

export function LoginButtonServer() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("pinterest", { redirectTo: "/" });
      }}
    >
      <Button variant="outline" type="submit">
        Connect to Pinterest
      </Button>
    </form>
  );
}

function LogoutButtonServer() {
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
