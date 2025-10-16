import { SessionConfig } from "@/components/session-config";
import { getBoards } from "@/components/drawing-session/actions";

export default async function Page() {
  const boardsData = await getBoards();
  // fake data so you don't use up all your requests
  // const boardsData = fakeBoardsData;

  console.log({ boardsData });

  return (
    <div className="px-4 md:px-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        <SessionConfig boardsData={boardsData.items} />
      </div>
    </div>
  );
}
