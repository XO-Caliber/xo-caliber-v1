import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

const Notes = () => {
  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="text-lg font-semibold">Notes:</h1>
      <span className="block w-full border-[1px] border-border "></span>
      <Textarea
        className="my-2 h-full resize-none focus-visible:ring-0"
        placeholder="Tell us a little bit about yourself"
      />
      <Button>save</Button>
    </section>
  );
};

export default Notes;
