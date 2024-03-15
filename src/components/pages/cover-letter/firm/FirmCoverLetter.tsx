import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { PlusSquare, UserPlus } from "lucide-react";
import React from "react";
import DragNDropSection from "../DragNDropSection";
import { UserCase } from "../UserCase";
import AddCoverLetterDialog from "../AddCoverLetterDialog";

export const FirmCoverLetter = (user: Baseuser) => {
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
        <AddCoverLetterDialog />
        <UserSelectList />
      </div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        <UserCase />
        <UserCase />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default FirmCoverLetter;
