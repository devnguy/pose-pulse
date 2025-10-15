"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, UseFieldArrayReturn } from "react-hook-form";
import { SessionConfigFormSchema } from "@/components/session-config";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  CountSelect,
  IntervalSelect,
} from "@/components/session-config/select";

type SectionRowProps = {
  index: number;
  control: Control<SessionConfigFormSchema>;
  fieldArray: UseFieldArrayReturn<SessionConfigFormSchema>;
};

export function ClassModeForm(props: {
  control: Control<SessionConfigFormSchema>;
  fieldArray: UseFieldArrayReturn<SessionConfigFormSchema>;
}) {
  const { control, fieldArray } = props;

  const handleAdd = () => {
    fieldArray.append({
      count: "10",
      interval: "10",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-1/2">
        <div>
          <FormLabel>Number of Images</FormLabel>
        </div>
        <div>
          <FormLabel>Interval</FormLabel>
        </div>
      </div>

      <div className="space-y-4 flex flex-col">
        {fieldArray.fields.map((val, i) => {
          return (
            <SectionRow
              key={val.id}
              index={i}
              control={control}
              fieldArray={fieldArray}
            />
          );
        })}
      </div>

      <div>
        <Button variant={"outline"} type="button" onClick={handleAdd}>
          <span>
            <Plus />
          </span>
          <span>Add Section</span>
        </Button>
      </div>
    </div>
  );
}

function SectionRow(props: SectionRowProps) {
  const { index, control, fieldArray } = props;
  const { fields, swap, remove } = fieldArray;

  const isFirst = index === 0;
  const isLast = index === fields.length - 1;
  const isSingle = fields.length === 1;

  const handleMoveUp = () => {
    if (!isFirst) {
      swap(index, index - 1);
    }
  };
  const handleMoveDown = () => {
    if (!isLast) {
      swap(index, index + 1);
    }
  };
  const handleRemove = () => {
    if (!isSingle) {
      remove(index);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-1/2">
      <FormField
        control={control}
        name={`sections.${index}.count` as const}
        render={({ field }) => (
          <FormItem className="w-full">
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
        name={`sections.${index}.interval` as const}
        render={({ field }) => (
          <FormItem className="w-full">
            <IntervalSelect
              onValueChange={field.onChange}
              defaultValue={field.value}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            type="button"
            onClick={handleMoveUp}
            disabled={isFirst}
          >
            <ChevronUp />
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleMoveDown}
            disabled={isLast}
          >
            <ChevronDown />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            type="button"
            onClick={handleRemove}
            disabled={isSingle}
          >
            <Trash />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}
