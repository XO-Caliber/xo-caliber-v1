import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { Loader } from "lucide-react";
import AdminTabsContent from "../AdminTabsContent";
import AddAdminCategoryDialog from "../../addCategory/AddAdminCategoryDialog";
import AddAdminQADialog from "../../addQA/AddAdminQADialog";

export const ViewAdminQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getAdminQuestions.useQuery();
  const { data: categories } = categoriesList;

  const refetchData = () => {
    categoriesList.refetch();
  };
  useEffect(() => {
    if (categories) {
      const newSet = new Set(listCat);
      categories.forEach((data) => newSet.add(data.name));
      setListCat(newSet);
    }
  }, [categories]);

  const { mutate: deleteAdminQuestion } = trpc.question.adminQuestionDelete.useMutation({
    onSuccess({ success }) {
      if (success) {
        categoriesList.refetch();
        router.refresh();
        toast({
          title: "Question Deleted",
          description: "The question was deleted successfully"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong"
      });
    }
  });
  const catArray = Array.from(listCat);

  const handleDelete = (questionId: string) => {
    try {
      deleteAdminQuestion(questionId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <AddAdminQADialog refetchData={refetchData} />
        <AddAdminCategoryDialog refetchData={refetchData} />
      </div>
      {catArray.length > 0 ? (
        <div className=" mt-4 h-[70vh]">
          <Tabs>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mt-2 h-[75vh] overflow-y-scroll">
              <AdminTabsContent
                data={categories}
                handleDelete={handleDelete}
                refetchData={refetchData}
              />
            </div>
          </Tabs>
        </div>
      ) : (
        <div>
          {!catArray.length ? (
            <></>
          ) : (
            <div className="flex h-[70vh] items-center justify-center">
              <Loader size={45} className="rotate-animation" />
            </div>
          )}
        </div>
      )}
      {!catArray && <div>Add a question or category</div>}
    </div>
  );
};
