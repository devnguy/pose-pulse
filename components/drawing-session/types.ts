import Stack from "@/lib/stack";

export interface SessionHistory<T> {
  items: Array<T>;
  yo: () => undefined;
}

export type Reference = {
  src: string;
  interval: number;
};

export type DrawingSessionState = {
  index: number;
  total: number;
  current: Reference;
  history: Array<Reference>; // want this to be an interface
  pool: Array<Reference>;
  isStopped: boolean;
  isPaused: boolean;
};

export type DrawingSessionConfig = {
  yo: string;
};
