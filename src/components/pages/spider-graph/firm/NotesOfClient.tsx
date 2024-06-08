import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { boolean } from "zod";
interface userProps {
  selectedUser: string;
  userType: string;
}
export function NotesOfClient({ selectedUser, userType }: userProps) {
  const clientNotesData = trpc.note.getFirmClientNotes.useQuery(selectedUser);
  const initialNotes = clientNotesData.data?.content;
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes]);

  const setAbility = () => {
    if (userType === "") {
      return false;
    }
    return true;
  };

  return (
    <section className="flex h-full w-full flex-col justify-between ">
      <h1 className="text-lg font-semibold text-heading">Client Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none text-sm font-semibold italic focus-visible:ring-0"
        placeholder="No data found"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={setAbility()}
      />
    </section>
  );
}

export default NotesOfClient;
