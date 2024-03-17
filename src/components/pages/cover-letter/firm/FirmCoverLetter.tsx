import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { UserPlus } from "lucide-react";
import AddSectionDialog from "../AddSectionDialog";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { ViewCoverLetter } from "../ViewCoverLetter";

export const FirmCoverLetter = ({ user }: { user: Baseuser }) => {
  // const categoriesResult = trpc.coverletter.getFirmCoverLetter.useQuery(user);

  return (
    <section>
      <div className="flex items-center justify-around">
        <ul className="ml-4 pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
          <h2 className="text-sm font-normal ">Here is the overview</h2>
        </ul>
        <Button variant={"outline"}>
          <UserPlus size={16} className="mr-2" />
          Assign Assistant
        </Button>
        <AddCoverLetterDialog userId={user.id} />
        <AddSectionDialog />
        <UserSelectList />
      </div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        <ViewCoverLetter />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default FirmCoverLetter;
