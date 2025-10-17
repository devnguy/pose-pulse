import { SessionConfig } from "@/components/session-config";
import { getBoards } from "@/lib/api/pinterest/queries";

export default async function Page() {
  const boardsData = getBoards();

  // fake data so you don't use up all your requests
  // const boardsData = await Promise.resolve(fakeBoardsData);

  console.log({ boardsData });

  return <SessionConfig boardsData={boardsData} />;
}
