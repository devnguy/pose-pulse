"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, UseFieldArrayReturn } from "react-hook-form";
import {
  DEFAULT_SECTION_CONFIG,
  SessionConfigFormSchema,
} from "@/components/session-config";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
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

type SectionRowProps = {
  index: number;
  control: Control<SessionConfigFormSchema>;
  fieldArray: UseFieldArrayReturn<SessionConfigFormSchema>;
};

export function ClassModeFormOld(props: {
  control: Control<SessionConfigFormSchema>;
  fieldArray: UseFieldArrayReturn<SessionConfigFormSchema>;
}) {
  const { control, fieldArray } = props;

  const handleAdd = () => {
    fieldArray.append(DEFAULT_SECTION_CONFIG);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
        <div>
          <FormLabel>Number of Images</FormLabel>
        </div>
        <div className="col-span-2">
          <FormLabel>Interval</FormLabel>
        </div>
      </div>

      <div className="space-y-4 flex flex-col">
        {fieldArray.fields.map((val, i) => {
          return (
            <SectionRowOld
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

function SectionRowOld(props: SectionRowProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
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
            <TableHead>Number of Images</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead></TableHead>
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
    <TableRow className="border-none hover:bg-transparent">
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
      </TableCell>
    </TableRow>
  );
}
