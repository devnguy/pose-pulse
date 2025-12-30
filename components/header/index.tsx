import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { Eclipse } from "lucide-react";
import { auth, signIn, signOut } from "@/auth";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export async function Header() {
  const session = await auth();

  return (
    <div className="h-[64px] flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/app">
          <Button variant="link" size="sm" className="p-0">
            <H3>Pose Pulse</H3>
          </Button>
        </Link>
        <Nav />
      </div>
      <div className="flex items-center space-x-2">
        {!session?.user ? <SignInButton /> : <SignOutButton />}
        <Button variant="ghost" size="icon" type="button">
          <Eclipse />
        </Button>
      </div>
    </div>
  );
}

export function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/app">Draw</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
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
