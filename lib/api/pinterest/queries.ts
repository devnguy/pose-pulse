"use server";

import { cache } from "react";
import { BoardItem, ImageSourceResponse, Pin } from "@/app/types";

export const getPinsByBoardId = cache(
  async (boardId: string): Promise<ImageSourceResponse<Pin>> => {
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
  },
);

export const getBoards = cache(
  async (): Promise<ImageSourceResponse<BoardItem>> => {
    const response = await fetch("https://api.pinterest.com/v5/boards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.IMAGE_SOURCE_ACCESS_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
  },
);

async function slow(time: number = 2500) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
