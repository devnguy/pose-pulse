"use client";

import { getRandomInt } from "@/lib/utils";
import { DrawingSessionState, Reference } from "./types";
import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { StandardSessionFormSchema } from "@/components/session-config/standard-session-form";

type DrawingSessionContextType = {
  state: DrawingSessionState;
  dispatch: ActionDispatch<[action: DrawingSessionAction]>;
};

export const DrawingSessionContext = createContext<
  DrawingSessionContextType | undefined
>(undefined);

export function DrawingSessionContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, undefined, initializeState);

  return (
    <DrawingSessionContext value={{ state, dispatch }}>
      {children}
    </DrawingSessionContext>
  );
}

export function useDrawingSessionContext() {
  const context = useContext(DrawingSessionContext);
  if (!context) {
    throw new Error(
      "useDrawingSessionContext must be used within DrawingSessionContextProvider",
    );
  }
  return context;
}

export type DrawingSessionAction =
  | DrawingSessionActionStart
  | DrawingSessionActionForward
  | DrawingSessionActionBack
  | DrawingSessionActionStop
  | DrawingSessionActionTogglePause
  | DrawingSessionActionConfigure
  | DrawingSessionActionAddToImagePool;

type DrawingSessionActionStart = {
  type: "START";
};
type DrawingSessionActionForward = {
  type: "FORWARD";
};
type DrawingSessionActionBack = {
  type: "BACK";
};
type DrawingSessionActionStop = {
  type: "STOP";
};
type DrawingSessionActionTogglePause = {
  type: "TOGGLE_PAUSE";
};
type DrawingSessionActionConfigure = {
  type: "CONFIGURE";
  payload: StandardSessionFormSchema;
};
type DrawingSessionActionAddToImagePool = {
  type: "ADD_TO_IMAGE_POOL";
  payload: {
    images: Array<string>;
  };
};
type DrawingSessionActionReset = {
  type: "RESET";
};

export function reducer(
  state: DrawingSessionState,
  action: DrawingSessionAction,
): DrawingSessionState {
  switch (action.type) {
    case "START":
      return state;
    case "FORWARD":
      return forward(state);
    case "BACK":
      return back(state);
    case "TOGGLE_PAUSE":
      return togglePause(state);
    case "STOP":
      return stop(state);
    case "CONFIGURE":
      return configure(state, action.payload);
    case "ADD_TO_IMAGE_POOL":
      return addToImagePool(state, action.payload);
    default:
      throw new Error("unsupported action");
  }
}

function forward(state: DrawingSessionState): DrawingSessionState {
  console.log("forward");
  if (state.index === state.total - 1) {
    return {
      ...state,
      isStopped: true,
    };
  }

  const nextIndex = state.index + 1;

  // We can traverse the history
  if (nextIndex < state.history.length) {
    return {
      ...state,
      index: nextIndex,
      current: state.history[nextIndex],
    };
  }

  // Otherwise, have to take a new item from the pool
  const randomIndex = getRandomInt(state.pool.images.length);

  const current: Reference = {
    src: state.pool.images[randomIndex],
    interval: state.pool.intervals[0],
  };
  const history = [...state.history, current];

  // Remove chosen items from the pool
  const newPool = {
    images: state.pool.images.filter((_, i) => i !== randomIndex),
    intervals: state.pool.intervals.slice(1),
  };

  return {
    ...state,
    index: nextIndex,
    pool: newPool,
    current,
    history,
  };
}

function back(state: DrawingSessionState): DrawingSessionState {
  console.log("back");
  if (state.index === 0) {
    return state;
  }

  const previousIndex = state.index - 1;

  return {
    ...state,
    index: previousIndex,
    current: state.history[previousIndex],
  };
}

function stop(state: DrawingSessionState): DrawingSessionState {
  return {
    ...state,
    isStopped: true,
  };
}

function togglePause(state: DrawingSessionState): DrawingSessionState {
  return {
    ...state,
    isPaused: !state.isPaused,
  };
}

function configure(
  state: DrawingSessionState,
  payload: DrawingSessionActionConfigure["payload"],
): DrawingSessionState {
  return {
    ...state,
    pool: {
      images: state.pool.images,
      intervals: Array.from(payload.total).map(() => Number(payload.interval)),
    },
    total: Number(payload.total),
    boardId: payload.boardId,
  };
}

function addToImagePool(
  state: DrawingSessionState,
  payload: DrawingSessionActionAddToImagePool["payload"],
): DrawingSessionState {
  return {
    ...state,
    pool: {
      intervals: state.pool.intervals,
      images: [...state.pool.images, ...payload.images],
    },
  };
}

function initializeState(): DrawingSessionState {
  return {
    index: 0,
    total: 0,
    history: [],
    pool: {
      images: [],
      intervals: [],
    },
    isStopped: false,
    isPaused: false,
  };
}
