import { trpc } from "@/app/_trpc/client";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
interface userType {
  userType: string;
}
export function UserNotes({ userType }: userType) {
  const userNotesData = trpc.note.getUserNotes.useQuery();
  const initialNotes = userNotesData.data?.content;
  const [notes, setNotes] = useState(initialNotes || " ");
  console.log(initialNotes);
  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes]);

  const { mutate: addNotes } = trpc.note.addUserNotes.useMutation({
    onSuccess() {
      userNotesData.refetch();
      toast({
        title: "Your notes was saved successfully",
        description: `${JSON.stringify(notes, null, 2)}`
      });
    },
    onError(error) {
      toast({
        title: "Something went wrong",
        description: `${error}`
      });
    }
  });

  function onSubmit() {
    addNotes(notes);
  }
  console.log(notes);
  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="text-lg font-semibold">Your Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none text-base font-semibold italic focus-visible:ring-0"
        placeholder="Provide details on the skills you see in the Spider Graph"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      {userType === "INDIVIDUAL" && (
        <div className="flex w-full justify-between">
          <Button className="mx-4 w-full" variant={"dark"} onClick={onSubmit}>
            Save
          </Button>
        </div>
      )}
    </section>
  );
}

export default UserNotes;
