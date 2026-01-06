"use client";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRow,
} from "@/components/ui/form";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import {
  DEFAULT_SECTION_CONFIG,
  SessionConfigFormSchema,
  SessionSection,
} from "@/components/session-config";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, X } from "lucide-react";
import {
  CountSelect,
  IntervalSelect,
} from "@/components/session-config/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCallback, useState } from "react";
import { cn, getIntervalLabel } from "@/lib/utils";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { useDragAndDropReorder } from "@/components/hooks/use-drag-and-drop-reorder";

type SectionRowProps = {
  index: number;
  fieldArray: UseFieldArrayReturn<SessionConfigFormSchema>;
};

export function CustomModeForm() {
  const { control } = useFormContext<SessionConfigFormSchema>();
  const fieldArray = useFieldArray({
    name: "customModeInput",
    control,
  });

  const handleAdd = () => {
    fieldArray.append(DEFAULT_SECTION_CONFIG);
  };

  return (
    <div className="">
      <FormRow>
        <div className="flex flex-col flex-3 gap-1">
          <FormLabel>Custom Sections</FormLabel>
          <FormDescription>
            Each image in a section is displayed for the same interval duration
          </FormDescription>
        </div>
        <div>
          <Button variant={"outline"} type="button" onClick={handleAdd}>
            <Plus />
            Add Section
          </Button>
        </div>
        <FormMessage />
      </FormRow>
      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-0 p-0" />
            <TableHead className="pl-0">Number of Images</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead className="w-0 p-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {fieldArray.fields.map((val, i) => {
            return (
              <SectionRow key={val.id} index={i} fieldArray={fieldArray} />
            );
          })}
        </TableBody>
        <TableFooter className="h-1.5" />
      </Table>
    </div>
  );
}

/**
 * Still figuring out how to useFieldArray in this component..
 * Need to pass this component the entire fieldArray, rather than just the
 * fieldArray element so:
 * 1. It can determine the fieldArray length
 * 2. It can rearrange the order of the elements
 */
function SectionRow(props: SectionRowProps) {
  const {
    index,
    fieldArray: { fields, move, remove },
  } = props;
  const [shouldShowControls, setShouldShowControls] = useState(false);
  const { control } = useFormContext<SessionConfigFormSchema>();

  const handleMove = useCallback(
    (from: number, to: number) => {
      move(from, to);
    },
    [move],
  );

  const item: (typeof fields)[number] & Partial<SessionSection> = fields[index];

  const { ref, dragHandleRef, dragAndDropState, Preview } =
    useDragAndDropReorder({
      index,
      item,
      move: handleMove,
    });

  const isSingle = fields.length === 1;

  const handleRemove = () => {
    if (!isSingle) {
      remove(index);
    }
  };

  return (
    <TableRow
      className={cn(
        "border-0 relative hover:bg-transparent",
        dragAndDropState.type === "preview" && "opacity-40",
      )}
      ref={ref}
      onMouseEnter={() => {
        setShouldShowControls(true);
      }}
      onMouseLeave={() => {
        setShouldShowControls(false);
      }}
      onTouchStart={() => {
        setShouldShowControls(true);
      }}
    >
      <TableCell className="p-0 w-0">
        <Button
          variant={"ghost"}
          size="icon"
          className={cn(
            "absolute -left-5.5 top-2.5 hover:cursor-grab w-6 h-6 hover:bg-transparent transition-none",
            !shouldShowControls && "opacity-0",
            isSingle && "hidden",
          )}
          ref={dragHandleRef}
          type="button"
        >
          <GripVertical
            size={16}
            className="text-[#9D9D9F] hover:cursor-grab"
          />
        </Button>
      </TableCell>
      <TableCell className="pl-0 pr-1.5">
        <FormField
          control={control}
          name={`customModeInput.${index}.count` as const}
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
      </TableCell>
      <TableCell className="pr-0">
        <FormField
          control={control}
          name={`customModeInput.${index}.interval` as const}
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
      </TableCell>
      <TableCell className="w-0 p-0">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-5.5 top-2.5 w-6 h-6 hover:bg-transparent transition-none",
            !shouldShowControls && "opacity-0",
            isSingle && "hidden",
          )}
          onClick={handleRemove}
          type="button"
        >
          <X className="text-[#9D9D9F]" />
        </Button>
        {dragAndDropState.type === "is-over" && dragAndDropState.closestEdge ? (
          <DropIndicator
            edge={dragAndDropState.closestEdge}
            type="terminal-no-bleed"
          />
        ) : null}
        <Preview
          content={`${item.count} x ${item.interval && getIntervalLabel(item.interval)}`}
        />
      </TableCell>
    </TableRow>
  );
}
