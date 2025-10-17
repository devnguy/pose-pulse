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
  // take first letter from interval
  const abbreviation = strArray[strArray.length - 1].split("")[0];

  return strArray[0] + abbreviation;
}
