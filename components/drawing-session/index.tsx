"use client";

import { useCallback, useEffect } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Timer } from "@/components/drawing-session/timer";
import { Button } from "../ui/button";
import Link from "next/link";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetcher } from "@/lib/api/pinterest/queries";
import { ImageSourceResponse, Pin } from "@/app/types";

// boardId: 136445132399848892
const getKey =
  (boardId: string | undefined): SWRInfiniteKeyLoader =>
  (pageIndex: number, previousPageData: ImageSourceResponse<Pin>) => {
    console.log("getKey", boardId, pageIndex, previousPageData);
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=25`;
    }

    // reached the end
    if (!previousPageData?.bookmark) {
      console.log("reached the end");
      return null;
    }

    return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=25&bookmark=${previousPageData.bookmark}`;
  };

export default function DrawingSession() {
  const { state, dispatch } = useDrawingSessionContext();

  const { data, isLoading, error } = useSWRInfinite(
    getKey(state.boardId),
    fetcher,
    {
      initialSize: 5,
    },
  );

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    console.log({ data, isLoading, error });
  }, [data, isLoading, error]);

  const handleForward = useCallback(() => {
    dispatch({ type: "FORWARD" });
  }, [dispatch]);

  return (
    <div className="py-12 px-4 h-screen w-full">
      {state.isStopped ? (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          <p className="">Session Complete</p>
          <div>
            <Link href={"/app"}>
              <Button>Back</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            {state.current && <CurrentImage src={state.current.src} />}
          </div>
          <Controller />
          {state.current && (
            <Timer
              seconds={state.current.interval}
              onTimeElapsed={handleForward}
              isPaused={state.isPaused}
            />
          )}
        </div>
      )}
    </div>
  );
}
