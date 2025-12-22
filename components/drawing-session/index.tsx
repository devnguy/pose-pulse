"use client";

import { useCallback } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Timer } from "@/components/drawing-session/timer";
import { Button } from "../ui/button";
import Link from "next/link";

export default function DrawingSession() {
  const { state, dispatch } = useDrawingSessionContext();

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
