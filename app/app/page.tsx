import { Header } from "@/components/header";
import { SessionConfig } from "@/components/session-config";
import { getBoards } from "@/lib/api/pinterest/queries";

export default async function Page() {
  const boardsPromise = getBoards();

  // fake data so you don't use up all your requests
  // const boardsData = await Promise.resolve(fakeBoardsData);

  // console.log({ boardsData });

  return (
    <div className="w-full">
      <Header />
      <div className="pt-6 ">
        <SessionConfig boardsPromise={boardsPromise} />
      </div>
    </div>
  );
}
