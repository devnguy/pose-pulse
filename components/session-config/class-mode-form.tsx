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
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";

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
            <TableHead className="w-0 p-0" />
            <TableHead>Number of Images</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead className="w-0 p-0" />
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
type State =
  | {
      type: "idle";
    }
  | {
      type: "preview";
    }
  | {
      type: "is-over";
      closestEdge: Edge | null;
    };

function SectionRow(props: SectionRowProps) {
  const {
    index,
    control,
    fieldArray: { fields, move, remove },
  } = props;

  const ref = useRef<HTMLTableRowElement>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<State>({ type: "idle" });
  const [shouldShowControls, setShouldShowControls] = useState(false);

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

    const isFirst = index === 0;

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
          setState({ type: "preview" });
        },
        onDrop() {
          setState({ type: "idle" });
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          return source.data.index !== index; // change this to id
        },
        getData({ input, element }) {
          const data = { ...item, index };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter(args) {
          setState({
            type: "is-over",
            closestEdge: extractClosestEdge(args.self.data),
          });
        },
        onDragLeave() {
          setState({ type: "idle" });
        },
        onDrag({ source, self }) {
          const closestEdge: Edge | null = extractClosestEdge(self.data);

          // only update react state if the `closestEdge` changes
          setState((current) => {
            const sourceIndex = source.data.index;
            invariant(typeof sourceIndex === "number");

            if (current.type !== "is-over") {
              return current;
            }
            if (current.closestEdge === closestEdge) {
              return current;
            }
            return {
              type: "is-over",
              closestEdge,
            };
          });
        },
        onDrop({ source, self }) {
          invariant(typeof source.data.index === "number");
          invariant(typeof self.data.index === "number");

          const sourceIndex = source.data.index;
          invariant(typeof sourceIndex === "number");
          const isItemBeforeSource = index < sourceIndex;
          const isItemAfterSource = index > sourceIndex;

          if (state.type === "is-over") {
            if (isItemAfterSource) {
              if (state.closestEdge === "top") {
                if (isFirst) {
                  move(source.data.index, 0);
                } else {
                  move(source.data.index, self.data.index - 1);
                }
              } else if (state.closestEdge === "bottom") {
                move(source.data.index, self.data.index);
              }
            } else if (isItemBeforeSource) {
              if (state.closestEdge === "top") {
                move(source.data.index, self.data.index);
              } else if (state.closestEdge === "bottom") {
                move(source.data.index, self.data.index + 1);
              }
            }
          }
          setState({ type: "idle" });
          if (source.element) {
            triggerPostMoveFlash(source.element);
          }
        },
      }),
    );
  }, [item, index, move, state]);

  return (
    <TableRow
      className={cn(
        "border-0 relative hover:bg-transparent",
        state.type === "preview" && "opacity-40",
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
        {state.type === "is-over" && state.closestEdge ? (
          <DropIndicator edge={state.closestEdge} type="terminal-no-bleed" />
        ) : null}
      </TableCell>
    </TableRow>
  );
}
