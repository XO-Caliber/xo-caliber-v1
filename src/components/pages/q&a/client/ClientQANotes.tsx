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
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(Note, null, 2)}</code>
            </pre>
          )
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
    <section className="relative  flex h-full w-full flex-col justify-between p-2">
      <h1 className="text-lg font-semibold">Your Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        value={Note}
        className="my-2 h-full resize-none text-base font-semibold italic focus-visible:ring-0"
        placeholder="Tell us a little bit about yourself"
        onChange={(e) => setNote(e.target.value)}
      />
      <Button variant={"destructive"} onClick={notesUpdate}>
        Save
      </Button>
    </section>
  );
};
