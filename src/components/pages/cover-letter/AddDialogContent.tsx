"use client";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { coverLetterSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type EditorJS from "@editorjs/editorjs";
import { Textarea } from "@/components/ui/Textarea";
import { DialogClose } from "@/components/ui/Dialog";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

const AddDialogContent = ({
  userId,
  itemId,
  contentType
}: {
  userId: string;
  itemId: string;
  contentType: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const ref = useRef<EditorJS>();

  const form = useForm<z.infer<typeof coverLetterSchema>>({
    resolver: zodResolver(coverLetterSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here your description here...",
        inlineToolbar: true,
        data: {
          blocks: []
        },
        tools: {
          header: Header,
          table: Table,
          list: List
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (isMounted) {
      init();
    }
  }, [isMounted, initializeEditor]);

  switch (contentType) {
    case "section":
  }

  const { mutate: addSection } = trpc.coverletter.addSection.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "New Section Added",
          description: "Successfully added new section"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const { mutate: addSubSection } = trpc.coverletter.addSubSection.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "New Sub Section Added",
          description: "Successfully added new sub section"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const { mutate: addExhibit } = trpc.coverletter.addExhibits.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "New Exhibit Added",
          description: "Successfully added new exhibit"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const onSubmit = async (values: z.infer<typeof coverLetterSchema>) => {
    const blocks = await ref.current?.save();

    console.log(values);
    console.log(JSON.stringify(blocks));
    console.log(itemId);
    switch (contentType) {
      case "section":
        addSection({
          userId: userId,
          coverLetterId: itemId,
          title: values.title,
          description: blocks,
          comments: values.comment
        });
        break;
      case "subSection":
        addSubSection({
          userId,
          sectionId: itemId,
          title: values.title,
          description: blocks,
          comments: values.comment
        });
      case "exhibit":
        addExhibit({
          userId,
          subSectionId: itemId,
          title: values.title,
          description: blocks,
          comments: values.comment
        });
    }
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2  gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="mb-2 text-lg font-bold">{contentType}</FormLabel>
                <FormControl>
                  <Input placeholder={`${contentType} title`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2 row-span-2">
                {/* <FormLabel className="mb-2 text-2xl font-bold">Description</FormLabel> */}
                <FormControl>
                  <div
                    {...field}
                    id="editor"
                    className="flex h-[400px] w-full cursor-text overflow-scroll overflow-x-hidden rounded-md border-2 border-border bg-background p-2 pl-6 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="col-start-3 col-end-4 row-start-1 row-end-3">
                <FormLabel className="mb-2 text-lg">Comments</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-3/4 max-h-full resize-none overflow-x-auto bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-start-3 col-end-3 row-start-3 row-end-3 flex justify-between">
            <DialogClose>
              <Button>Close</Button>
            </DialogClose>
            <Button variant={"primary"} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default AddDialogContent;
