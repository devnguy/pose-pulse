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
  | DrawingSessionActionConfigure;

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
  const randomIndex = getRandomInt(state.pool.length);
  const current = state.pool[randomIndex];
  const history = [...state.history, current];
  const newPool = state.pool.filter((_, i) => i !== randomIndex);

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
  // TODO: hopefully temporarily overriding the initialized state
  const newPool = state.pool.map((ref) => ({
    ...ref,
    interval: Number(payload.interval),
  }));
  const history = state.history.map((ref) => ({
    ...ref,
    interval: Number(payload.interval),
  }));

  return {
    ...state,
    current: {
      ...state.current,
      interval: Number(payload.interval),
    },
    pool: newPool,
    history,
  };
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
