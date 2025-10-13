export type Reference = {
  src: string;
  interval: number;
};

export type DrawingSessionState = {
  index: number;
  total: number;
  history: Array<Reference>; // want this to be an interface
  pool: {
    images: Array<string>;
    intervals: Array<number>;
  };
  isStopped: boolean;
  isPaused: boolean;
  boardId?: string;
  current?: Reference;
};

export type DrawingSessionConfig = {
  yo: string;
};
