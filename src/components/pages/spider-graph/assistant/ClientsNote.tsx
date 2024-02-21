import { trpc } from "@/app/_trpc/client";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
interface userType {
  selectedUser: string;
}
export function ClientsNote({ selectedUser }: userType) {
  const userNotesData = trpc.note.getClientNotesByAssistant.useQuery(selectedUser);
  const initialNotes = userNotesData.data?.content;
  const [notes, setNotes] = useState(initialNotes || " ");
  console.log(initialNotes);
  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes]);

  console.log(notes);
  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="text-lg font-semibold">Your Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none text-base font-semibold italic focus-visible:ring-0"
        placeholder="Tell us a little bit about yourself"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={true}
      />
    </section>
  );
}

export default ClientsNote;
