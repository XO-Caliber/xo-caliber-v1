"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import FirmTabsContent from "../FirmTabsContent";
import { Loader } from "lucide-react";
import AddQADiaglog from "../../addQA/AddQADiaglog";
import AddCategoryDialog from "../../addCategory/AddCategoryDialog";
import ImportAdmin from "../../firm/ImportAdmin";
import { AssistantDialog } from "../../addAssistant/AssistantDialog";

export const ViewFirmQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getFirmQuestions.useQuery();
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

  const { mutate: deleteFirmQuestion } = trpc.question.firmQuestionDelete.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
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
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Caliber Q&A</p>
        <div className="mr-4 flex space-x-12">
          <AddQADiaglog refetchData={refetchData} />
          <AddCategoryDialog refetchData={refetchData} />
          <AssistantDialog />
          <ImportAdmin />
        </div>
      </div>

      <div className="fixed bottom-[960px] left-[1150px] ml-8 mr-12 space-x-16"></div>
      {catArray.length > 0 ? (
        <div className="h-[70vh]">
          <Tabs>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mr-2 mt-2 h-[75vh] overflow-y-scroll">
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

export default ViewFirmQA;
