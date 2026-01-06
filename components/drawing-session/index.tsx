"use client";

import { useCallback, useEffect, useRef } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Timer } from "@/components/drawing-session/timer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetcher } from "@/lib/api/pinterest/queries";
import { ImageSourceResponse, Pin } from "@/app/types";
import { getImagesFromResponse } from "@/components/drawing-session/helpers";

const getKey =
  (boardId: string | undefined): SWRInfiniteKeyLoader =>
  (pageIndex: number, previousPageData: ImageSourceResponse<Pin>) => {
    if (boardId === "local") {
      return null;
    }
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `https://api.pinterest.com/v5/boards/${boardId}/pins?page_size=250`;
    }

    // reached the end
    if (!previousPageData?.bookmark) {
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

  // Changes don't trigger a rerender
  const processedPagesRef = useRef(0);
  const sessionStartedRef = useRef(false);

  if (state.boardId === "local" && !sessionStartedRef.current) {
    sessionStartedRef.current = true;
  }

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

  if (state.error) {
    throw new Error(state.error.message);
  }

  const handleForward = useCallback(() => {
    dispatch({ type: "FORWARD" });
  }, [dispatch]);

  return (
    <div className="py-12 px-4 h-screen w-full">
      <div className="flex flex-col justify-center space-y-4 items-center h-full">
        {state.isStopped ? (
          <>
            <p className="text-lg">Session Complete</p>
            <div>
              <Link href={"/app"}>
                <Button>Back</Button>
              </Link>
            </div>
          </>
        ) : !sessionStartedRef.current ? (
          <>
            <p className="text-lg">Preparing Session</p>
            <Spinner className="size-8" />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
