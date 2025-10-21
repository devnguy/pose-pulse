"use server";

import { cache } from "react";
import { BoardItem, ImageSourceResponse, Pin } from "@/app/types";
import { auth } from "@/auth";

export const getPinsByBoardId = cache(
  async (boardId: string): Promise<ImageSourceResponse<Pin>> => {
    // TODO: access_token could be null
    const session = await auth();

    if (!session) {
      return {
        bookmark: "",
        items: [],
      };
    }

    const response = await fetch(
      `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=250`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
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
    // TODO: access_token could be null
    const session = await auth();

    if (!session) {
      return {
        bookmark: "",
        items: [],
      };
    }

    const response = await fetch("https://api.pinterest.com/v5/boards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
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
