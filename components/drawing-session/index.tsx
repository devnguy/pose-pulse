/*
https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg
https://i.pinimg.com/736x/e5/93/bd/e593bd305eb6f2057d735c7d786f0800.jpg
https://i.pinimg.com/1200x/63/93/38/63933826489b96732e4f5b5560c09b7f.jpg
https://i.pinimg.com/1200x/90/14/f8/9014f806d4a3d64a648540223bbe95e9.jpg
https://i.pinimg.com/736x/08/db/22/08db22a9ea7c801e574e1ada11a024cc.jpg
*/

"use client";

import { useCallback, useReducer } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { reducer } from "@/components/drawing-session/reducer";
import { Timer } from "@/components/drawing-session/timer";
import {
  DrawingSessionState,
  Reference,
} from "@/components/drawing-session/types";
import { getRandomInt } from "@/lib/utils";

export default function DrawingSession() {
  const [state, dispatch] = useReducer(reducer, undefined, initializeState);

  const handleForward = useCallback(() => {
    dispatch({ type: "FORWARD" });
  }, []);

  const handleBack = () => {
    dispatch({ type: "BACK" });
  };

  const handleTogglePause = () => {
    dispatch({ type: "TOGGLE_PAUSE" });
  };

  const handleStop = () => {
    dispatch({ type: "STOP" });
  };

  // TODO: use a provider and context here so you don't have to pass so many props
  return (
    <div className="py-12 px-4 h-screen">
      {state.isStopped ? (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          Done
        </div>
      ) : (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <CurrentImage src={state.current.src} />
          </div>
          <Controller
            onForward={handleForward}
            onBack={handleBack}
            onStop={handleStop}
            onTogglePause={handleTogglePause}
            isPaused={state.isPaused}
          />
          <Timer
            seconds={state.current.interval}
            onTimeElapsed={handleForward}
            isPaused={state.isPaused}
          />
        </div>
      )}
    </div>
  );
}

function initializeState(): DrawingSessionState {
  const pool: Reference[] = [
    {
      src: "https://i.pinimg.com/1200x/93/e9/f7/93e9f73456983d14f60722ad9c71ccad.jpg",
      interval: 3,
    },
    {
      src: "https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg",
      interval: 4,
    },
    {
      src: "https://i.pinimg.com/736x/e5/93/bd/e593bd305eb6f2057d735c7d786f0800.jpg",
      interval: 5,
    },
    {
      src: "https://i.pinimg.com/1200x/63/93/38/63933826489b96732e4f5b5560c09b7f.jpg",
      interval: 3,
    },
    {
      src: "https://i.pinimg.com/1200x/32/9c/c8/329cc828e7cc0b078218ae7b072881bb.jpg",
      interval: 6,
    },
    {
      src: "https://i.pinimg.com/736x/27/fe/5d/27fe5df7c2f6a6797af76313a874e461.jpg",
      interval: 7,
    },
  ];

  const randomIndex = getRandomInt(pool.length);
  const history = [pool[randomIndex]];

  const newPool = pool.filter((_, i) => i !== randomIndex);

  return {
    index: 0,
    total: pool.length,
    current: pool[randomIndex],
    history,
    pool: newPool,
    isStopped: false,
    isPaused: false,
  };
}

/*

requirements for config:

how long to display image
what image to display

Section = {
  count: 5
  interval: 30
}

Config = {
  sections: Array<Section>
  total: number
  pool: Array<Reference>
}

Config -> Session State


*/
