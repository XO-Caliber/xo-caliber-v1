import UserSelectList from "@/components/utils/UserSelectList";
import { AssistantDialog } from "../AssistantDialog";
import AddQADiaglog from "../AddQADiaglog";
import AddCategoryDialog from "../AddCategoryDialog";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";

const AdminQA = async () => {
  // const [data, setData] = useState({
  //   categories: ["default"],
  //   datas: [
  //     {
  //       category: "default",
  //       questions: [
  //         {
  //           id: 0,
  //           question: "",
  //           mark: "10"
  //         }
  //       ]
  //     }
  //   ]
  // });

  // const handleAddData = (values: any) => {
  //   setData((prevData) => ({
  //     categories: [...prevData.categories],
  //     datas: [...prevData.datas, { category: selectedTab, questions: [values] }]
  //   }));
  //   console.log(data);
  // };

  // const handleDelete = (id: number) => {
  //   setData((prevData) => ({
  //     categories: [...prevData.categories],
  //     datas: [
  //       ...prevData.datas,
  //       {
  //         category: selectedTab,
  //         questions:
  //           prevData.datas
  //             .find((item) => item.category === selectedTab)
  //             ?.questions?.filter((item) => item.id !== id) || []
  //       }
  //     ]
  //   }));
  // };

  // const createCategory = (values: string) => {
  //   setData((prevData) => ({
  //     categories: [...prevData.categories, values],
  //     datas: [...prevData.datas]
  //   }));
  // };

  // const handleCategoryPopOpen = () => {
  //   setCategoryPopOpen(!categoryPopOpen);
  // };

  // const handleOpen = () => {
  //   setPopOpen(!popOpen);
  // };
  const session = await getAuthSession();

  return (
    <div className="m-4 ml-56 text-xl ">
      <div className="flex items-center justify-around">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-sm font-normal text-muted">Here’s a list of Bonny davis’s cases</p>
        </div>
        <AssistantDialog firmId={session?.user.id} />
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

export default AdminQA;
