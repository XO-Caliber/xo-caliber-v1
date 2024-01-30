"use client";
import UserSelectList from "@/components/utils/UserSelectList";
import { AssistantDialog } from "../addAssistant/AssistantDialog";
import AddQADiaglog from "../addQA/AddQADiaglog";
import AddCategoryDialog from "../addCategory/AddCategoryDialog";
import { ViewQA } from "../viewQA/ViewQA";

const FirmQA = () => {
  return (
    <div className="m-4 ml-56 text-xl ">
      <div className="flex items-center justify-around">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-sm font-normal text-muted">Here’s a list of Bonny davis’s cases</p>
        </div>
        <AssistantDialog />
        <AddQADiaglog />
        <AddCategoryDialog />
        <UserSelectList />
      </div>
      <ViewQA />
    </div>
  );
};

export default FirmQA;
