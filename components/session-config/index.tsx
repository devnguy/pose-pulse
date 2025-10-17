"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { useRouter } from "next/navigation";
import { BoardGroup } from "@/components/image-group";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ClassModeForm } from "@/components//session-config/class-mode-form";
import { StandardModeForm } from "@/components//session-config/standard-mode-form";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { getPinsByBoardId } from "@/lib/api/pinterest/queries";
import { getImagesFromResponse } from "@/components/drawing-session/helpers";

const numericString = z.string().refine(
  (v) => {
    const n = Number(v);
    return !isNaN(n) && v?.length > 0;
  },
  { message: "Invalid number" },
);

const FormSchema = z.object({
  boardId: z.string(),
  sections: z.array(
    z.object({
      count: numericString,
      interval: numericString,
    }),
  ),
});

export type SessionConfigFormSchema = z.infer<typeof FormSchema>;

enum SessionType {
  STANDARD = "STANDARD",
  CLASS = "CLASS",
}

export const DEFAULT_SECTION_CONFIG = {
  count: "10",
  interval: "30",
};

type SessionConfigProps = {
  boardsData: Promise<ImageSourceResponse<BoardItem>>;
  // boardsData: ImageSourceResponse<BoardItem>;
};

export function SessionConfig(props: SessionConfigProps) {
  const { boardsData } = props;
  const router = useRouter();
  const { state, dispatch } = useDrawingSessionContext();
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.STANDARD,
  );

  const form = useForm<SessionConfigFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sections: [DEFAULT_SECTION_CONFIG],
    },
  });

  const sectionsField = useFieldArray({
    name: "sections",
    control: form.control,
  });

  async function onSubmit(data: SessionConfigFormSchema) {
    // remove any form changes from class mode
    if (sessionType === SessionType.STANDARD) {
      data.sections = data.sections.slice(0, 1);
    }

    const response = await getPinsByBoardId(data.boardId);
    const images = getImagesFromResponse(response);

    dispatch({
      type: "INIT",
      payload: { ...data, images },
    });

    router.push("/app/session");
  }

  useEffect(() => {
    console.log({ state });
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="">
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a Board</FormLabel>
                <BoardGroup
                  boardsData={boardsData}
                  value={field.value}
                  onValueChangeAction={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex flex-col space-y-8">
          <ToggleGroup
            type="single"
            defaultValue={sessionType}
            onValueChange={(val: SessionType) => {
              setSessionType(val);
            }}
          >
            <ToggleGroupItem
              value={SessionType.STANDARD}
              aria-label="Toggle standard"
            >
              <div className="h-4 px-4">Standard</div>
            </ToggleGroupItem>
            <ToggleGroupItem
              value={SessionType.CLASS}
              aria-label="Toggle class"
            >
              <div className="h-4 px-4">Class</div>
            </ToggleGroupItem>
          </ToggleGroup>

          {sessionType === SessionType.STANDARD ? (
            <StandardModeForm control={form.control} />
          ) : (
            <ClassModeForm control={form.control} fieldArray={sectionsField} />
          )}

          <div className="md:w-1/2 w-full">
            <Button size="lg" type="submit">
              Start
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
