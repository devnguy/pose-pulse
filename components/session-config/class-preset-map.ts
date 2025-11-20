import { SessionSection } from ".";
import { ClassPreset } from "./class-mode-form";

export const getClassModeValueFromPreset = (
  preset: ClassPreset,
): Array<SessionSection> =>
  ({
    [ClassPreset.THIRTY_MIN]: [
      {
        count: "10",
        interval: "30",
      },
      {
        count: "5",
        interval: "60",
      },
      {
        count: "2",
        interval: "300",
      },
      {
        count: "1",
        interval: "600",
      },
    ],
    [ClassPreset.ONE_HOUR]: [
      {
        count: "10",
        interval: "30",
      },
      {
        count: "5",
        interval: "60",
      },
      {
        count: "2",
        interval: "300",
      },
      {
        count: "1",
        interval: "600",
      },
      {
        count: "1",
        interval: "1500",
      },
    ],
    [ClassPreset.NINETY_MIN]: [
      {
        count: "6",
        interval: "30",
      },
      {
        count: "3",
        interval: "60",
      },
      {
        count: "2",
        interval: "180",
      },
      {
        count: "1",
        interval: "600",
      },
      {
        count: "1",
        interval: "1500",
      },
      {
        count: "1",
        interval: "2100",
      },
    ],
    [ClassPreset.TWO_HOURS]: [
      {
        count: "6",
        interval: "30",
      },
      {
        count: "3",
        interval: "60",
      },
      {
        count: "2",
        interval: "300",
      },
      {
        count: "2",
        interval: "600",
      },
      {
        count: "1",
        interval: "1200",
      },
      {
        count: "1",
        interval: "3000",
      },
    ],
    [ClassPreset.THREE_HOURS]: [
      {
        count: "10",
        interval: "30",
      },
      {
        count: "5",
        interval: "60",
      },
      {
        count: "2",
        interval: "300",
      },
      {
        count: "1",
        interval: "600",
      },
      {
        count: "1",
        interval: "1200",
      },
      {
        count: "2",
        interval: "1800",
      },
      {
        count: "1",
        interval: "3000",
      },
    ],
  })[preset];
