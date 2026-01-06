export type Reference = {
  src: string;
  interval: number;
};

export type Time = {
  minutes: number;
  seconds: number;
};

export type DrawingSessionState = {
  index: number;
  total: number;
  history: Array<Reference>;
  pool: {
    images: Array<string>;
    intervals: Array<number>;
  };
  isStopped: boolean;
  isPaused: boolean;
  isHardModeEnabled: boolean;
  boardId?: string;
  current?: Reference;
  error?: Error;
};
