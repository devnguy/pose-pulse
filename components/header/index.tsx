import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { Eclipse } from "lucide-react";

export function Header() {
  return (
    <div className="h-[64px] flex items-center justify-between">
      <Link href="/app">
        <Button variant="ghost" size="sm" className="p-0">
          <H3>Pose Pulse</H3>
        </Button>
      </Link>
      <div>
        <Button variant="ghost" size="icon">
          <Eclipse />
        </Button>
      </div>
    </div>
  );
}
