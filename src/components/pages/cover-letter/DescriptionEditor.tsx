import React from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import starterKit, { StarterKit } from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";

export const DescriptionEditor = ({
  description,
  onChange
}: {
  description: string;
  onChange: (richtext: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border-2 min-h-[100px] border-border p-2 focus:outline-none"
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getJSON());
      // console.log(editor.getHTML());
    }
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
