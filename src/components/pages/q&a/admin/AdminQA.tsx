"use client";
import AddAdminQADialog from "../addQA/AddAdminQADialog";
import { ViewFirmQA } from "../viewQA/firm/ViewFirmQA";
import AddAdminCategoryDialog from "../addCategory/AddAdminCategoryDialog";
import { ViewAdminQA } from "../viewQA/admin/ViewAdminQA";

const AdminQA = () => {
  return (
    <div className="m-4 ml-56 text-xl ">
      <div className="flex items-center justify-around">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-sm font-normal text-muted">Here’s a list of Bonny davis’s cases</p>
        </div>

        <AddAdminQADialog />
        <AddAdminCategoryDialog />
      </div>
      <ViewAdminQA />
    </div>
  );
};

export default AdminQA;
