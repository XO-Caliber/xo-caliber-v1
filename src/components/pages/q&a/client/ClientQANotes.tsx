import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const ClientQANotes = () => {
  const notes = trpc.note.getQANotes.useQuery();
  const initialNotes = notes.data || "";
  const [Note, setNote] = useState(initialNotes);

  console.log("initialNotes:" + initialNotes);
  console.log("Notes:" + Note);

  useEffect(() => {
    setNote(initialNotes || "");
  }, [initialNotes]);

  const { mutate: updateNote } = trpc.note.addQANotes.useMutation({
    onSuccess({ success }) {
      notes.refetch();
      if (success) {
        toast({
          title: "Updated notes",
          description: "Saved successfully"
        });
      }
    }
  });

  const notesUpdate = () => {
    try {
      updateNote(Note);
    } catch (err) {}
  };

  return (
    <section className="relative  flex h-full w-full flex-col  justify-between bg-white p-2">
      <ul className="flex justify-between">
        <h1 className="items-start text-lg font-semibold">Your Notes:</h1>
        <Button variant={"dark"} onClick={notesUpdate} className="mb-1 mr-4 h-7 w-20">
          Save Notes
        </Button>
      </ul>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        value={Note}
        className="my-2 h-full resize-none text-base font-semibold italic focus-visible:ring-0"
        placeholder="If Yes response:- Provide two cents on the topic"
        onChange={(e) => setNote(e.target.value)}
      />
    </section>
  );
};
