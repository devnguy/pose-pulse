import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormRow,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SessionConfigFormSchema } from ".";
import { CountSelect, IntervalSelect } from "./select";
import { Separator } from "../ui/separator";

export function StandardModeForm() {
  const { control } = useFormContext<SessionConfigFormSchema>();

  return (
    <div className="flex flex-col w-full">
      <FormField
        control={control}
        name="standardModeInput.count"
        render={({ field }) => (
          <FormRow>
            <div className="flex flex-col flex-3 gap-1">
              <FormLabel>Number of Images</FormLabel>
              <FormDescription>
                Total number of images displayed during the session
              </FormDescription>
            </div>
            <div className="flex-1">
              <CountSelect
                onValueChange={field.onChange}
                defaultValue={field.value}
              />
            </div>
            <FormMessage />
          </FormRow>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="standardModeInput.interval"
        render={({ field }) => (
          <FormRow>
            <div className="flex flex-col flex-3 gap-1">
              <FormLabel>Interval</FormLabel>
              <FormDescription>
                The time each image is displayed
              </FormDescription>
            </div>
            <div className="flex-1">
              <IntervalSelect
                onValueChange={field.onChange}
                defaultValue={field.value}
              />
            </div>
            <FormMessage />
          </FormRow>
        )}
      />
    </div>
  );
}
