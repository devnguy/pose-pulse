"use client";

import { useCallback, useEffect, useRef } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Timer } from "@/components/drawing-session/timer";
import { Button } from "../ui/button";
import Link from "next/link";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetcher } from "@/lib/api/pinterest/queries";
import { ImageSourceResponse, Pin } from "@/app/types";
import { getImagesFromResponse } from "./helpers";

const getKey =
  (boardId: string | undefined): SWRInfiniteKeyLoader =>
  (pageIndex: number, previousPageData: ImageSourceResponse<Pin>) => {
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=250`;
    }

    // reached the end
    if (!previousPageData?.bookmark) {
      console.log("reached the end");
      return null;
    }

    return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=250&bookmark=${previousPageData.bookmark}`;
  };

export default function DrawingSession() {
  const { state, dispatch } = useDrawingSessionContext();

  const { data, error } = useSWRInfinite(getKey(state.boardId), fetcher, {
    initialSize: 5,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (error) {
    console.log(error);
  }

  const processedPagesRef = useRef(0);
  const sessionStartedRef = useRef(false);

  useEffect(() => {
    if (!data) return;

    // Add only new pages
    if (data.length > processedPagesRef.current) {
      const newPages = data.slice(processedPagesRef.current);

      for (const page of newPages) {
        dispatch({
          type: "ADD_TO_IMAGE_POOL",
          payload: {
            images: getImagesFromResponse(page),
          },
        });
      }

      processedPagesRef.current = data.length;
    }
    // Start session once
    if (!sessionStartedRef.current && data.length > 0) {
      dispatch({ type: "START_SESSION" });
      sessionStartedRef.current = true;
    }
  }, [data, dispatch]);

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
      ) : !state.current ? (
        <div>Loading</div>
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
