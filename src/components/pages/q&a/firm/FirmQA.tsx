import UserSelectList from "@/components/utils/UserSelectList";
import { AssistantDialog } from "../AssistantDialog";
import AddQADiaglog from "../AddQADiaglog";
import AddCategoryDialog from "../AddCategoryDialog";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { trpc } from "@/app/_trpc/client";

const FirmQA = async () => {
  // const categories = trpc.getFirmQuestions.useQuery();

  const session = await getAuthSession();

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
      {/* {data.categories.length > 0 ? (
        <div className="absolute left-[400px] ">
          {/* <Tabs onValueChange={(value) => setSelectedTab(value)}>
            <QATabsList categories={data.categories} />
            <QATabsContent datas={data.datas} handleDelete={handleDelete} />
          </Tabs> */}
    </div>
    // ) : null */}
    // </div>
  );
};

export default FirmQA;
