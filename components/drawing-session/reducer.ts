import { getRandomInt } from "@/lib/utils";
import { DrawingSessionState } from "./types";

type DrawingSessionActionType = "START" | "NEXT" | "STOP";
export type DrawingSessionAction =
  | DrawingSessionActionStart
  | DrawingSessionActionForward
  | DrawingSessionActionBack
  | DrawingSessionActionStop
  | DrawingSessionActionTogglePause;

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
