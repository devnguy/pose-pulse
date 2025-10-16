import { getRandomInt } from "@/lib/utils";
import {
  DrawingSessionState,
  Reference,
} from "@/components/drawing-session/types";

import { SessionConfigFormSchema } from "@/components/session-config";
import { ImageSourceResponse, Pin } from "@/app/types";
export type DrawingSessionAction =
  | DrawingSessionActionInit
  | DrawingSessionActionForward
  | DrawingSessionActionBack
  | DrawingSessionActionTogglePause
  | DrawingSessionActionStop
  | DrawingSessionActionAddToImagePool;

type DrawingSessionActionInit = {
  type: "INIT";
  payload: SessionConfigFormSchema & {
    images: Array<string>;
  };
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

export function reducer(
  state: DrawingSessionState,
  action: DrawingSessionAction,
): DrawingSessionState {
  switch (action.type) {
    case "INIT":
      return init(state, action.payload);
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
    default:
      throw new Error("unsupported action");
  }
}

// TODO: Does this function and its variable naming make sense?
function init(
  state: DrawingSessionState,
  payload: DrawingSessionActionInit["payload"],
): DrawingSessionState {
  const start: { intervals: Array<number>; total: number } = {
    intervals: [],
    total: 0,
  };

  const aggregate = payload.sections.reduce((prev, cur) => {
    const intervals = Array(Number(cur.count)).fill(Number(cur.interval));
    return {
      intervals: [...prev.intervals, ...intervals],
      total: prev.total + Number(cur.count),
    };
  }, start);

  // Take a new item from the pool
  const randomIndex = getRandomInt(payload.images.length);

  const current: Reference = {
    src: payload.images[randomIndex],
    interval: aggregate.intervals[0],
  };
  const history = [current];

  // Remove chosen items from the pool
  const newPool = {
    images: payload.images.filter((_, i) => i !== randomIndex),
    intervals: aggregate.intervals.slice(1),
  };

  return {
    index: 0,
    total: aggregate.total,
    history,
    pool: newPool,
    isStopped: false,
    isPaused: false,
    current,
    boardId: payload.boardId,
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
  return {
    ...state,
    pool: {
      ...state.pool,
      images: [...state.pool.images, ...payload.images],
    },
  };
}

export function getImagesFromResponse(
  response: ImageSourceResponse<Pin>,
): Array<string> {
  const images = response.items.map((item) => {
    const vals = Object.values(item.media.images);
    return vals[vals.length - 1].url;
  });

  return images;
}
