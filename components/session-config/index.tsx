"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRow,
} from "@/components/ui/form";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { useRouter } from "next/navigation";
import { CustomModeForm } from "@/components//session-config/custom-mode-form";
import { StandardModeForm } from "@/components//session-config/standard-mode-form";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { SectionHeading, SectionSubHeading } from "../ui/typography";
import { Switch } from "@/components/ui/switch";
import { FileDropInput } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChooseBoardDialog } from "@/components/session-config/choose-board-dialog";
import { ClassModeForm, ClassPreset } from "./class-mode-form";
import { getClassModeValueFromPreset } from "./class-preset-map";

export enum SessionType {
  STANDARD = "STANDARD",
  CLASS = "CLASS",
  CUSTOM = "CUSTOM",
}

export enum ImageSourceType {
  PINTEREST = "PINTEREST",
  LOCAL = "LOCAL",
}

const numericString = z.string().refine(
  (v) => {
    const n = Number(v);
    return !isNaN(n) && v?.length > 0;
  },
  { message: "Invalid number" },
);

export type SessionSection = {
  count: string;
  interval: string;
};

const FormSchema = z.object({
  boardId: z.string("Board required"),
  sessionType: z.enum(SessionType),
  standardModeInput: z.object({
    count: numericString,
    interval: numericString,
  }),
  classModeInput: z.enum(ClassPreset),
  customModeInput: z.array(
    z.object({
      count: numericString,
      interval: numericString,
    }),
  ),
});

export type SessionConfigFormSchema = z.infer<typeof FormSchema>;

export const DEFAULT_SECTION_CONFIG = {
  count: "10",
  interval: "30",
};

type SessionConfigProps = {
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
};

const defaultValues = {
  sessionType: SessionType.STANDARD,
  standardModeInput: DEFAULT_SECTION_CONFIG,
  classModeInput: ClassPreset.THIRTY_MIN,
  // temporary values for easier testing
  customModeInput: [
    {
      count: "5",
      interval: "30",
    },
    {
      count: "5",
      interval: "60",
    },
    {
      count: "5",
      interval: "90",
    },
  ],
};

export function SessionConfig(props: SessionConfigProps) {
  const { boardsPromise } = props;
  const router = useRouter();
  const { dispatch } = useDrawingSessionContext();

  const form = useForm<SessionConfigFormSchema>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onBlur",
    defaultValues,
  });

  const getSectionsFromFormData = (
    formData: SessionConfigFormSchema,
  ): Array<SessionSection> => {
    if (formData.sessionType === SessionType.STANDARD) {
      return [formData.standardModeInput];
    }
    if (formData.sessionType === SessionType.CLASS) {
      return getClassModeValueFromPreset(formData.classModeInput);
    }
    return formData.customModeInput;
  };

  async function onSubmit(data: SessionConfigFormSchema) {
    // console.log({ data });
    const sections = getSectionsFromFormData(data);

    dispatch({
      type: "INIT",
      payload: { sections, boardId: data.boardId },
    });

    router.push(`/app/session`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-3"
      >
        <SectionHeading>Customize Session</SectionHeading>

        <div className="flex flex-col gap-2">
          <SectionSubHeading>Image Source</SectionSubHeading>
          <Tabs defaultValue={ImageSourceType.PINTEREST}>
            <TabsList>
              <TabsTrigger value={ImageSourceType.PINTEREST}>
                Pinterest
              </TabsTrigger>
              <TabsTrigger value={ImageSourceType.LOCAL}>Local</TabsTrigger>
            </TabsList>

            <TabsContent value={ImageSourceType.PINTEREST}>
              <Card className="p-0">
                <CardContent>
                  <FormRow>
                    <div className="flex flex-col flex-3 gap-1">
                      <FormLabel>Board</FormLabel>
                      <FormDescription>
                        The Pinterest board containing the reference images
                      </FormDescription>
                      <FormField
                        name="boardId"
                        // ChooseBoardDialog handles the rendering for this form field,
                        // but we still need to display the error message
                        render={() => <FormMessage />}
                      />
                    </div>
                    {/* choose board button or chosen board */}
                    <ChooseBoardDialog boardsPromise={boardsPromise} />
                  </FormRow>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value={ImageSourceType.LOCAL}>
              <Card className="p-0">
                <CardContent>
                  <LocalImageInputField />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2">
          <SectionSubHeading>Session Type</SectionSubHeading>
          <FormField
            control={form.control}
            name="sessionType"
            render={({ field }) => (
              <Tabs
                defaultValue={defaultValues.sessionType}
                onValueChange={field.onChange}
              >
                <TabsList>
                  <TabsTrigger value={SessionType.STANDARD}>
                    Standard
                  </TabsTrigger>
                  <TabsTrigger value={SessionType.CLASS}>Class</TabsTrigger>
                  <TabsTrigger value={SessionType.CUSTOM}>Custom</TabsTrigger>
                </TabsList>

                <TabsContent value={SessionType.STANDARD}>
                  <Card className="p-0">
                    <CardContent>
                      <StandardModeForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value={SessionType.CLASS}>
                  <Card className="p-0">
                    <CardContent>
                      <ClassModeForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value={SessionType.CUSTOM}>
                  <Card className="p-0">
                    <CardContent>
                      <CustomModeForm />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <SectionSubHeading>Settings</SectionSubHeading>
          <Card className="p-0">
            <CardContent>
              <FormRow>
                <div className="flex flex-col flex-3 gap-1">
                  <FormLabel>Hard Mode</FormLabel>
                  <FormDescription>
                    Disable pause, back, and skip controls during the session
                  </FormDescription>
                </div>
                <div>
                  <Switch />
                </div>
              </FormRow>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full pt-3">
          <Button type="submit">Start</Button>
        </div>
      </form>
    </Form>
  );
}

function LocalImageInputField() {
  return (
    <FormItem className="py-3">
      <div className="flex gap-1">
        <FormLabel>Image Files</FormLabel>
        <FormDescription>
          The reference images to use during the session
        </FormDescription>
      </div>
      <FileDropInput />
    </FormItem>
  );
}
