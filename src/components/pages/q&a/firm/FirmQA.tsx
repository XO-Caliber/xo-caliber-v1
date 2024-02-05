"use client";
import UserSelectList from "@/components/utils/UserSelectList";
import { AssistantDialog } from "../addAssistant/AssistantDialog";
import AddQADiaglog from "../addQA/AddQADiaglog";
import AddCategoryDialog from "../addCategory/AddCategoryDialog";
import { ViewFirmQA } from "../viewQA/firm/ViewFirmQA";
import ImportAdmin from "./ImportAdmin";

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
        <ImportAdmin />
      </div>
      <ViewFirmQA />
    </div>
  );
};

export default FirmQA;
