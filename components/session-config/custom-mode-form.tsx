"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import {
  DEFAULT_SECTION_CONFIG,
  SessionConfigFormSchema,
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
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
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
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-0 p-0" />
            <TableHead>Number of Images</TableHead>
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
      </Table>

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

  const { ref, dragHandleRef, dragAndDropState } = useDragAndDropReorder({
    index,
    item: fields[index],
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
            "absolute -left-4.5 top-3 hover:cursor-grab w-6 h-6 hover:bg-transparent transition-none",
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
      <TableCell>
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
      <TableCell>
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
      <TableCell className="p-0 w-6">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "p-0 w-6 h-6 transition-none",
            !shouldShowControls && "opacity-0",
            isSingle && "hidden",
          )}
          onClick={handleRemove}
          type="button"
        >
          <X />
        </Button>
        {dragAndDropState.type === "is-over" && dragAndDropState.closestEdge ? (
          <DropIndicator
            edge={dragAndDropState.closestEdge}
            type="terminal-no-bleed"
          />
        ) : null}
      </TableCell>
    </TableRow>
  );
}
