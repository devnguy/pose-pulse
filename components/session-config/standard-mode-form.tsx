import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SessionConfigFormSchema } from ".";
import { CountSelect, IntervalSelect } from "./select";

export function StandardModeForm(props: {
  control: Control<SessionConfigFormSchema>;
}) {
  const { control } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:w-1/2 w-full">
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
