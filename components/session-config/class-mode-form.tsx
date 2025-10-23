"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Control, UseFieldArrayReturn } from "react-hook-form";
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
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { cn } from "@/lib/utils";

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
    fieldArray.append(DEFAULT_SECTION_CONFIG);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-0" />
            <TableHead>Number of Images</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
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

function SectionRow(props: SectionRowProps) {
  const {
    index,
    control,
    fieldArray: { fields, swap, remove },
  } = props;

  const ref = useRef<HTMLTableRowElement>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const item = fields[index];
  const isSingle = fields.length === 1;

  const handleRemove = () => {
    if (!isSingle) {
      remove(index);
    }
  };

  useEffect(() => {
    const element = ref.current;
    const dragHandle = dragHandleRef.current;
    invariant(element);
    invariant(dragHandle);

    return combine(
      draggable({
        element,
        dragHandle,
        getInitialData() {
          return {
            ...item,
            index,
          };
        },
        onDragStart() {
          setIsDragging(true);
        },
        onDrop() {
          setIsDragging(false);
        },
      }),
      dropTargetForElements({
        element,
        getData() {
          return {
            ...item,
            index,
          };
        },
        onDrop({ source, self }) {
          invariant(typeof source.data.index === "number");
          invariant(typeof self.data.index === "number");
          swap(source.data.index, self.data.index);
        },
      }),
    );
  }, [item, index, swap]);

  return (
    <TableRow
      className={cn("border-none", isDragging && "opacity-40")}
      ref={ref}
    >
      <TableCell className="p-0">
        <Button
          variant={"ghost"}
          size="icon"
          className="p-0 hover:cursor-grab w-6 h-6 hover:bg-transparent"
          ref={dragHandleRef}
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
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={handleRemove}
          disabled={isSingle}
        >
          <X />
        </Button>
      </TableCell>
    </TableRow>
  );
}
