import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import UserSelectList from "@/components/utils/UserSelectList";
import { UserPlus } from "lucide-react";

export const AssistantDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-4 border-gray-400 font-medium hover:border"
          // onClick={handleOpen}
          size={"sm"}
        >
          <UserPlus size={16} />
          <p className="ml-2">Assign Assistant</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add assistant to this user</DialogTitle>
          <DialogDescription>Select an assistant from the below list:</DialogDescription>
          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between py-4">
              <Label htmlFor="name" className="text-right">
                For User:
              </Label>
              {/* <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" /> */}
              <UserSelectList />
            </div>
            <div className="flex w-full items-center justify-between py-4">
              <Label htmlFor="username" className="text-right">
                Assign Assistant:
              </Label>
              {/* <Input id="username" defaultValue="@peduarte" className="col-span-3" /> */}
              <UserSelectList />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4" variant="primary">
              Save changes
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
