import PageLayout from "@/components/layout/page-layout";
import { SessionConfig } from "@/components/session-config";
import { H1 } from "@/components/ui/typography";
import { getBoards } from "@/lib/api/pinterest/queries";

export default async function Page() {
  const boardsPromise = getBoards();

  return (
    <PageLayout>
      <div className="py-6">
        <H1 className="text-left">Drawing Session</H1>
      </div>
      <SessionConfig boardsPromise={boardsPromise} />
    </PageLayout>
  );
}
