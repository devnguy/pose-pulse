"use client";

import { useFormContext } from "react-hook-form";
import { SessionConfigFormSchema } from "@/components/session-config";
import { Separator } from "../ui/separator";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRow,
} from "../ui/form";
import { ClassPresetSelect } from "./select";
import { getClassModeValueFromPreset } from "./class-preset-map";

export enum ClassPreset {
  THIRTY_MIN = "THIRTY_MIN",
  ONE_HOUR = "ONE_HOUR",
  NINETY_MIN = "NINETY_MIN",
  TWO_HOURS = "TWO_HOURS",
  THREE_HOURS = "THREE_HOURS",
}

export function ClassModeForm() {
  const { control, watch } = useFormContext<SessionConfigFormSchema>();

  const preset = watch("classModeInput");
  const presetValues = getClassModeValueFromPreset(preset);

  return (
    <div>
      <FormField
        control={control}
        name="classModeInput"
        render={({ field }) => (
          <FormRow>
            <div className="flex flex-col flex-3 gap-1">
              <FormLabel>Class Duration</FormLabel>
              <FormDescription>Total time of the class session</FormDescription>
            </div>
            <div className="flex-1">
              <ClassPresetSelect
                onValueChange={field.onChange}
                defaultValue={field.value}
              />
            </div>
            <FormMessage />
          </FormRow>
        )}
      />
      <Separator />
      <FormItem className="py-3">
        <div className="flex gap-1">
          <FormLabel>Class Details</FormLabel>
          <FormDescription>
            The interval and number of images that will be displayed
          </FormDescription>
        </div>
        <div>
          <ul className="list-disc ml-4">
            {presetValues.map((section, index) => (
              <li
                key={index}
              >{`${getIntervalLabel(section.interval)} x ${section.count}`}</li>
            ))}
          </ul>
        </div>
      </FormItem>
    </div>
  );
}

const getIntervalLabel = (interval: string): string => {
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
};
