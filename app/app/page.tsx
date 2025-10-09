import { StandardSessionForm } from "@/components/session-config/standard-session-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-dvw h-dvh">
      <StandardSessionForm />
      <div>
        <Link href="app/session">
          <Button size="lg">Start</Button>
        </Link>
      </div>
    </div>
  );
}
