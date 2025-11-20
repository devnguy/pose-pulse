import { Header } from "@/components/header";
import { SessionConfig } from "@/components/session-config";
import { H1 } from "@/components/ui/typography";
import { getBoards } from "@/lib/api/pinterest/queries";

export default async function Page() {
  const boardsPromise = getBoards();

  // fake data so you don't use up all your requests
  // const boardsData = await Promise.resolve(fakeBoardsData);

  // console.log({ boardsData });

  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-center">
        <div className="w-[740px]">
          <div className="py-6">
            <H1 className="text-left">Drawing Session</H1>
          </div>
          <SessionConfig boardsPromise={boardsPromise} />
        </div>
      </div>
    </div>
  );
}
