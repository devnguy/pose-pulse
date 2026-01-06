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
import { SectionHeading, SectionSubHeading } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { FileDropInput } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChooseBoardDialog } from "@/components/session-config/choose-board-dialog";
import {
  ClassModeForm,
  ClassPreset,
} from "@/components/session-config/class-mode-form";
import { getClassModeValueFromPreset } from "@/components/session-config/class-preset-map";
import { use } from "react";
import { Session } from "next-auth";
import { LoginButtonClient } from "@/components/session-config/login-button";

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

const FormSchema = z
  .object({
    imageSource: z.enum(ImageSourceType),
    boardId: z.string("Board required").optional(),
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
    isHardModeEnabled: z.boolean(),
    files:
      typeof window === "undefined"
        ? z.any()
        : z.instanceof(FileList, { message: "Required (in def)" }).optional(),
  })
  .refine(
    (data) =>
      !(
        data.imageSource === ImageSourceType.PINTEREST &&
        data.boardId === undefined
      ),
    { message: "board required", path: ["boardId"] },
  )
  .refine(
    (data) =>
      !(data.imageSource === ImageSourceType.LOCAL && data.files === undefined),
    {
      message: "files required",
      path: ["files"],
    },
  );

export type SessionConfigFormSchema = z.infer<typeof FormSchema>;

export const DEFAULT_SECTION_CONFIG = {
  count: "10",
  interval: "30",
};

type SessionConfigProps = {
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
  sessionPromise: Promise<Session | null>;
};

const defaultValues = {
  imageSource: ImageSourceType.PINTEREST,
  sessionType: SessionType.STANDARD,
  standardModeInput: DEFAULT_SECTION_CONFIG,
  classModeInput: ClassPreset.THIRTY_MIN,
  isHardModeEnabled: false,
  customModeInput: [
    {
      count: "10",
      interval: "30",
    },
    {
      count: "5",
      interval: "60",
    },
    {
      count: "2",
      interval: "300",
    },
    {
      count: "1",
      interval: "600",
    },
  ],
};

export function SessionConfig(props: SessionConfigProps) {
  const { boardsPromise, sessionPromise } = props;
  const session = use(sessionPromise);

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
    const sections = getSectionsFromFormData(data);

    if (data.imageSource === ImageSourceType.PINTEREST && data.boardId) {
      dispatch({
        type: "INIT",
        payload: {
          sections,
          boardId: data.boardId,
          isHardModeEnabled: data.isHardModeEnabled,
        },
      });
    }
    if (data.imageSource === ImageSourceType.LOCAL) {
      const fileUrls: string[] = [];
      if (data.files instanceof FileList) {
        for (const file of data.files) {
          fileUrls.push(URL.createObjectURL(file));
        }
      }
      dispatch({
        type: "INIT",
        payload: {
          sections,
          boardId: "local",
          isHardModeEnabled: data.isHardModeEnabled,
        },
      });
      dispatch({
        type: "ADD_TO_IMAGE_POOL",
        payload: {
          images: fileUrls,
        },
      });
      dispatch({ type: "START_SESSION" });
    }

    router.push(`/session`);
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

          <FormField
            control={form.control}
            name="imageSource"
            render={({ field }) => (
              <Tabs
                defaultValue={defaultValues.imageSource}
                onValueChange={field.onChange}
              >
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
                          <FormLabel htmlFor="boardId">Board</FormLabel>
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
                        {!session?.user ? (
                          <LoginButtonClient />
                        ) : (
                          // choose board button or chosen board
                          <ChooseBoardDialog boardsPromise={boardsPromise} />
                        )}
                      </FormRow>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value={ImageSourceType.LOCAL}>
                  <Card className="p-0">
                    <CardContent>
                      {/* <LocalImageInputField /> */}
                      <FormField
                        control={form.control}
                        name="files"
                        render={({ field }) => (
                          <FormItem className="py-3">
                            <div className="flex gap-1">
                              <FormLabel>Image Files</FormLabel>
                              <FormDescription>
                                The reference images to use during the session
                              </FormDescription>
                            </div>
                            <FileDropInput
                              name="files"
                              onChange={(event) => {
                                field.onChange(
                                  event.target?.files ?? undefined,
                                );
                              }}
                              numberOfFiles={field.value?.length}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          />
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
              <FormField
                control={form.control}
                name="isHardModeEnabled"
                render={({ field }) => (
                  <FormRow>
                    <div className="flex flex-col flex-3 gap-1">
                      <FormLabel htmlFor="isHardModeEnabled">
                        Hard Mode
                      </FormLabel>
                      <FormDescription>
                        Disable pause, back, and skip controls during the
                        session
                      </FormDescription>
                    </div>
                    <div>
                      <Switch
                        name="isHardModeEnabled"
                        id="isHardModeEnabled"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        defaultChecked={defaultValues.isHardModeEnabled}
                      />
                    </div>
                  </FormRow>
                )}
              />
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
