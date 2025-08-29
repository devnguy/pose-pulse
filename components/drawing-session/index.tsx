/*
https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg
https://i.pinimg.com/736x/e5/93/bd/e593bd305eb6f2057d735c7d786f0800.jpg
https://i.pinimg.com/1200x/63/93/38/63933826489b96732e4f5b5560c09b7f.jpg
https://i.pinimg.com/1200x/90/14/f8/9014f806d4a3d64a648540223bbe95e9.jpg
https://i.pinimg.com/736x/08/db/22/08db22a9ea7c801e574e1ada11a024cc.jpg
*/

"use client";

import { useReducer } from "react";
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
  const [state, dispatch] = useReducer(reducer, initializeState());

  const handleForward = () => {
    dispatch({ type: "FORWARD" });
  };

  const handleBack = () => {
    dispatch({ type: "BACK" });
  };

  return (
    <div className="flex flex-col justify-center space-y-4 items-center mb-12">
      <CurrentImage src={state.current.src} />
      <Controller onForward={handleForward} onBack={handleBack} />
      <Timer seconds={state.current.interval} onTimeElapsed={handleForward} />
    </div>
  );
}

function initializeState(): DrawingSessionState {
  const pool: Reference[] = [
    {
      src: "https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg",
      interval: 5,
    },
    {
      src: "https://i.pinimg.com/736x/e5/93/bd/e593bd305eb6f2057d735c7d786f0800.jpg",
      interval: 6,
    },
    {
      src: "https://i.pinimg.com/1200x/63/93/38/63933826489b96732e4f5b5560c09b7f.jpg",
      interval: 4,
    },
    {
      src: "https://i.pinimg.com/1200x/90/14/f8/9014f806d4a3d64a648540223bbe95e9.jpg",
      interval: 7,
    },
    {
      src: "https://i.pinimg.com/736x/08/db/22/08db22a9ea7c801e574e1ada11a024cc.jpg",
      interval: 8,
    },
  ];

  const randomIndex = getRandomInt(pool.length);
  const history = [pool[randomIndex]];

  const newPool = pool.filter((_, i) => i !== randomIndex);

  return {
    index: 0,
    total: 5,
    current: pool[randomIndex],
    history,
    pool: newPool,
  };
}
