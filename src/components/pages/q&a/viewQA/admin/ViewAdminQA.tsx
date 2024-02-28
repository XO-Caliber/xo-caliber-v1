import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { Copyright, Loader } from "lucide-react";
import AdminTabsContent from "../AdminTabsContent";
import AddAdminCategoryDialog from "../../addCategory/AddAdminCategoryDialog";
import AddAdminQADialog from "../../addQA/AddAdminQADialog";

export const ViewAdminQA = () => {
  const year = new Date().getFullYear();
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getAdminQuestions.useQuery();
  const [categories, setCategories] = useState<any[]>([]);
  const [catArray, setCatArray] = useState<string[]>([]);

  const refetchData = () => {
    categoriesList.refetch();
  };

  useEffect(() => {
    if (categoriesList.data) {
      setCategories(categoriesList.data);
    }
  }, [categoriesList.data]);

  useEffect(() => {
    if (categories) {
      const newSet = new Set(categories.map((data) => data.name));
      setListCat(newSet);
    }
  }, [categories]);

  useEffect(() => {
    setCatArray(Array.from(listCat));
  }, [listCat]);

  const { mutate: deleteAdminQuestion } = trpc.question.adminQuestionDelete.useMutation({
    onSuccess({ success }) {
      if (success) {
        categoriesList.refetch();
        router.refresh();
        toast({
          title: "Question Deleted",
          description: "Succesfully deleted the question"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong"
      });
    }
  });

  const handleDelete = (questionId: string) => {
    try {
      deleteAdminQuestion(questionId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0 ">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Caliber Q&A</p>
        <div className="mr-4 flex space-x-12">
          <AddAdminQADialog refetchData={refetchData} />
          <AddAdminCategoryDialog refetchData={refetchData} />
        </div>
      </div>
      {catArray.length > 0 ? (
        <div className="h-[70vh] p-4">
          <Tabs>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mr-2 mt-2 h-[70vh] overflow-y-scroll">
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
      {/* <div className="fixed top-[946px] flex h-[70px] w-full items-center justify-center border-2 border-x-0 bg-gray-100">
        <div className="flex items-center justify-center space-x-1">
          <p className="text-sm font-bold">{year}</p>
          <Copyright size={16} className="font-bold" />
          <p className="text-sm font-bold">XO Caliber</p>
        </div>
      </div> */}
    </div>
  );
};
