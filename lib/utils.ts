import { Time } from "@/components/drawing-session/types";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function formatDistanceToNowShort(date: string) {
  // returns "about x interval" or "x interval"
  const distance = formatDistanceToNow(date);
  const strArray = distance.split(" ");
  if (strArray.length === 3) {
    // remove "about"
    strArray.splice(0, 1);
  }
  const charArray = strArray[strArray.length - 1].split("");

  // differentiate months from minutes
  // take first letter from interval for all others
  const abbreviation =
    charArray[0] === "m" && charArray[1] === "o" ? "mo" : charArray[0];

  return strArray[0] + abbreviation;
}

export function getIntervalLabel(interval: string): string {
  const n = Number(interval);
  if (isNaN(n)) {
    return "";
  }
  if (n / 60 < 1) {
    return `${n} seconds`;
  }
  if (n / 60 === 1) {
    return `1 minute`;
  }
  return `${n / 60} minutes`;
}
