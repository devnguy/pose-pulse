"use server";

import { BoardItem, ImageSourceResponse, Pin } from "@/app/types";

export async function getPinsByBoardId(
  boardId: string,
): Promise<ImageSourceResponse<Pin>> {
  const response = await fetch(
    `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=250`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.IMAGE_SOURCE_ACCESS_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  return await response.json();
}

export async function getBoards(): Promise<ImageSourceResponse<BoardItem>> {
  const response = await fetch(
    "https://api.pinterest.com/v5/boards?privacy=PUBLIC_AND_SECRET",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.IMAGE_SOURCE_ACCESS_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  return await response.json();
}
