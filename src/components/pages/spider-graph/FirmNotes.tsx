import { trpc } from "@/app/_trpc/client";
import { Textarea } from "@/components/ui/Textarea";
import { useEffect, useState } from "react";
interface userType {
  userType: string;
}
export function FirmNotes({ userType }: userType) {
  const firmNotesData = trpc.note.getClientFirmNotes.useQuery();
  const initialNotes = firmNotesData.data?.content;
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes]);

  const setAbility = () => {
    if (userType === "FIRM") {
      return false;
    }
    return true;
  };

  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="text-lg font-semibold text-heading">Firm Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none text-sm font-semibold italic text-black focus-visible:ring-0"
        placeholder="No data found"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={setAbility()}
      />
    </section>
  );
}

export default FirmNotes;
