import { Control } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormRow,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SessionConfigFormSchema } from ".";
import { CountSelect, IntervalSelect } from "./select";
import { Separator } from "../ui/separator";

export function StandardModeFormOld(props: {
  control: Control<SessionConfigFormSchema>;
}) {
  const { control } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <FormField
        control={control}
        name={`sections.0.count` as const}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Number of Images</FormLabel>
            <CountSelect
              onValueChange={field.onChange}
              defaultValue={field.value}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`sections.0.interval` as const}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Interval</FormLabel>
            <IntervalSelect
              onValueChange={field.onChange}
              defaultValue={field.value}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function StandardModeForm(props: {
  control: Control<SessionConfigFormSchema>;
}) {
  const { control } = props;

  return (
    <div className="flex flex-col w-full">
      <FormField
        control={control}
        name={`sections.0.count` as const}
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
        name={`sections.0.interval` as const}
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
