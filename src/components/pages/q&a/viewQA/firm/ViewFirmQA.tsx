"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import FirmTabsContent from "../FirmTabsContent";
import { Loader } from "lucide-react";
import AddQADiaglog from "../../addQA/AddQADiaglog";
import AddCategoryDialog from "../../addCategory/AddCategoryDialog";

export const ViewFirmQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getFirmQuestions.useQuery();
  let { data: categories } = categoriesList;
  const [catArray, setCatArray] = useState<string[]>([]);
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
  useEffect(() => {
    setCatArray(Array.from(listCat));
  }, [listCat]);

  const { mutate: deleteFirmQuestion } = trpc.question.firmQuestionDelete.useMutation({
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
        title: "Something went wrong",
        description: `${err}`
      });
    }
  });

  const handleDelete = (questionId: string) => {
    try {
      deleteFirmQuestion(questionId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="absolute bottom-[883px] left-[600px]">
        <AddQADiaglog refetchData={refetchData} />
        <AddCategoryDialog refetchData={refetchData} />
      </div>
      {catArray.length > 0 ? (
        <div className=" mt-4 h-[70vh]">
          <Tabs>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mt-2 h-[75vh] overflow-y-scroll">
              <FirmTabsContent
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
      {!catArray.length && (
        <div className="flex h-[70vh] items-center justify-center">
          Please add a question or category
        </div>
      )}
    </div>
  );
};
