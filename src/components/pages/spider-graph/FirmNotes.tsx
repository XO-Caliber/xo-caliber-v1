import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function FirmNotes() {
  const [notes, setNotes] = useState("");

  function onSubmit() {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(notes, null, 2)}</code>
        </pre>
      )
    });
  }
  console.log(notes);
  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="text-lg font-semibold">Firm Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none text-base font-semibold italic focus-visible:ring-0"
        placeholder="Tell us a little bit about yourself"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <Button className="mx-4 w-full" variant={"secondary"}>
          Edit
        </Button>
        <Button className="mx-4 w-full" variant={"dark"} onClick={onSubmit}>
          Save
        </Button>
      </div>
    </section>
  );
}

export default FirmNotes;
