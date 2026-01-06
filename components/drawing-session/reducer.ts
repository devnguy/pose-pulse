import { getRandomInt } from "@/lib/utils";
import {
  DrawingSessionState,
  Reference,
} from "@/components/drawing-session/types";

import { SessionSection } from "@/components/session-config";
export type DrawingSessionAction =
  | DrawingSessionActionInit
  | DrawingSessionActionStartSession
  | DrawingSessionActionForward
  | DrawingSessionActionBack
  | DrawingSessionActionTogglePause
  | DrawingSessionActionStop
  | DrawingSessionActionAddToImagePool
  | DrawingSessionActionClearError;

type DrawingSessionActionInit = {
  type: "INIT";
  payload: {
    boardId: string;
    sections: Array<SessionSection>;
    isHardModeEnabled: boolean;
  };
};
type DrawingSessionActionStartSession = {
  type: "START_SESSION";
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
type DrawingSessionActionAddToImagePool = {
  type: "ADD_TO_IMAGE_POOL";
  payload: {
    images: Array<string>;
  };
};
type DrawingSessionActionClearError = {
  type: "CLEAR_ERROR";
};

export function reducer(
  state: DrawingSessionState,
  action: DrawingSessionAction,
): DrawingSessionState {
  switch (action.type) {
    case "INIT":
      return init(state, action.payload);
    case "START_SESSION":
      return startSession(state);
    case "FORWARD":
      return forward(state);
    case "BACK":
      return back(state);
    case "TOGGLE_PAUSE":
      return togglePause(state);
    case "STOP":
      return stop(state);
    case "ADD_TO_IMAGE_POOL":
      return addToImagePool(state, action.payload);
    case "CLEAR_ERROR":
      return clearError(state);
    default:
      throw new Error("unsupported action");
  }
}

function init(
  state: DrawingSessionState,
  payload: DrawingSessionActionInit["payload"],
): DrawingSessionState {
  const start: { intervals: Array<number>; total: number } = {
    intervals: [],
    total: 0,
  };

  const aggregate = payload.sections.reduce((prev, cur) => {
    const intervals = Array(Number(cur.count)).fill(
      Number(cur.interval),
    ) as Array<number>;
    return {
      intervals: [...prev.intervals, ...intervals],
      total: prev.total + Number(cur.count),
    };
  }, start);

  return {
    ...state,
    current: undefined,
    index: 0,
    total: aggregate.total,
    pool: {
      images: [],
      intervals: aggregate.intervals,
    },
    isStopped: false,
    isPaused: false,
    boardId: payload.boardId,
    isHardModeEnabled: payload.isHardModeEnabled,
  };
}

function startSession(state: DrawingSessionState): DrawingSessionState {
  if (state.pool.images.length === 0) {
    return {
      ...state,
      error: new Error("No images in image pool"),
    };
  }
  // Take a new item from the pool
  const randomIndex = getRandomInt(state.pool.images.length);

  const current: Reference = {
    src: state.pool.images[randomIndex],
    interval: state.pool.intervals[0],
  };
  const history = [current];

  // Remove chosen items from the pool
  const newPool = {
    images: state.pool.images.filter((_, i) => i !== randomIndex),
    intervals: state.pool.intervals.slice(1),
  };

  return {
    ...state,
    index: 0,
    history,
    pool: newPool,
    isStopped: false,
    isPaused: false,
    current,
  };
}

function forward(state: DrawingSessionState): DrawingSessionState {
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

function addToImagePool(
  state: DrawingSessionState,
  payload: DrawingSessionActionAddToImagePool["payload"],
): DrawingSessionState {
  if (payload.images) {
    return {
      ...state,
      pool: {
        ...state.pool,
        images: [...state.pool.images, ...payload.images],
      },
    };
  }
  return {
    ...state,
  };
}

function clearError(state: DrawingSessionState): DrawingSessionState {
  return {
    ...state,
    error: undefined,
  };
}
