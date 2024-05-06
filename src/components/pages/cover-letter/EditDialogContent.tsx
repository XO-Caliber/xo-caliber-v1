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
import { DialogType } from "@/types/Dialog";
import { Prisma } from "@prisma/client";
import { PenBoxIcon } from "lucide-react";

interface EditDialogContentProps {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  contentType: DialogType;
  refetchData: () => void;
}

const EditDialogContent = ({
  id,
  title,
  description,
  comments,
  contentType,
  refetchData
}: EditDialogContentProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const ref = useRef<EditorJS>();

  const form = useForm<z.infer<typeof coverLetterSchema>>({
    resolver: zodResolver(coverLetterSchema),
    mode: "onChange",
    defaultValues: {
      title: title,
      description: "",
      comment: comments ?? ""
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
        //@ts-ignore
        data: description,
        tools: {
          header: Header,
          table: Table,
          list: List
        },
        autofocus: true,
        readOnly: true
      });
    }
  }, [description]);

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

  const { mutate: updateSection } = trpc.coverletter.updateSection.useMutation({
    onSuccess({ success }) {
      refetchData();
      if (success) {
        toast({
          title: "Edited section successfully",
          description: "Successfully updated section"
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
      setLoading(false);
    }
  });

  const { mutate: updateSubSection } = trpc.coverletter.updateSubSection.useMutation({
    onSuccess({ success }) {
      refetchData();
      if (success) {
        toast({
          title: "SubSection edited Successfully",
          description: "Successfully updated sub section"
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
      setLoading(false);
    }
  });

  const { mutate: updateExhibit } = trpc.coverletter.updateExhibit.useMutation({
    onSuccess({ success }) {
      refetchData();
      if (success) {
        toast({
          title: "Exhibit edited Successfully ",
          description: "Successfully updated exhibit"
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
      setLoading(false);
    }
  });

  const onSubmit = async (values: z.infer<typeof coverLetterSchema>) => {
    const blocks = await ref.current?.save();
    setLoading(true);
    toggleEdit();
    console.log(values);
    console.log(JSON.stringify(blocks));
    switch (contentType) {
      case "Section":
        updateSection({
          sectionId: id,
          title: values.title,
          description: blocks,
          comments: values.comment
        });
        break;
      case "Subsection":
        updateSubSection({
          subSectionId: id,
          title: values.title,
          description: blocks,
          comments: values.comment
        });
        break;
      case "Exhibit":
        updateExhibit({
          exhibitId: id,
          title: values.title,
          description: blocks,
          comments: values.comment
        });
        break;
    }
  };

  const toggleEdit = () => {
    setEditable(!editable);
    if (ref.current) {
      const editor = ref.current;
      editor.readOnly.toggle();

      // If you want to apply some styling or indication based on the mode, you can do so here
      const isReadOnly = editor.readOnly.isEnabled;
      if (isReadOnly) {
        // Add styles or indication for read-only mode
      } else {
        // Add styles or indication for editable mode
      }
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
                  <Input {...field} type="text" disabled={!editable} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2 row-span-3">
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
              <FormItem className="col-start-3 col-end-4 row-start-1 row-end-4">
                <FormLabel className="mb-2 text-lg">Comments</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-3/4 max-h-full resize-none overflow-x-auto bg-secondary"
                    disabled={!editable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="reset"
            variant={"dark"}
            className="col-start-3 col-end-4 row-start-3 row-end-3 flex gap-3 font-bold"
            onClick={toggleEdit}
          >
            <PenBoxIcon size={15} />
            Edit
          </Button>
          <div className="col-start-3 col-end-3 row-start-4 row-end-4 flex justify-between">
            <Button variant={"dark"} type="submit" isLoading={loading} disabled={!editable}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default EditDialogContent;
