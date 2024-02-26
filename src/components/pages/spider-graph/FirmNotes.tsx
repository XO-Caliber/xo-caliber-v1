import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { boolean } from "zod";
interface userType {
  userType: string;
}
export function FirmNotes({ userType }: userType) {
  const firmNotesData = trpc.note.getClientFirmNotes.useQuery();
  const initialNotes = firmNotesData.data?.content;
  const [notes, setNotes] = useState(initialNotes);
  console.log(initialNotes);

  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes]);

  const setAbility = () => {
    if (userType === "FIRM") {
      return false;
    }
    return true;
  };

  // function onSubmit() {
  //   toast({
  //     title: "Your notes was saved successfully",
  //     description: `${JSON.stringify(notes, null, 2)}`
  //   });
  // }
  console.log(notes);
  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="text-lg font-semibold">Firm Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none text-base font-semibold italic text-black focus-visible:ring-0"
        placeholder="Tell us a little bit about yourself"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={setAbility()}
      />
    </section>
  );
}

export default FirmNotes;
