"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import FirmQATabsContent from "../AllTabsContent";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import AllTabsContent from "../AllTabsContent";
import { Loader } from "lucide-react";

export const ViewFirmQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getFirmQuestions.useQuery();
  const { data: categories } = categoriesList;

  // Use useEffect to update listCat when categories change
  useEffect(() => {
    if (categories) {
      const newSet = new Set(listCat);
      categories.forEach((data) => newSet.add(data.name));
      setListCat(newSet);
    }
  }, [categories]);
  console.log(categories);

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
  const catArray = Array.from(listCat);

  const handleDelete = (questionId: string) => {
    try {
      deleteFirmQuestion(questionId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {catArray.length > 0 ? (
        <div className="mt-4 h-[70vh] overflow-y-scroll">
          <Tabs>
            <QATabsList categories={catArray} />
            <AllTabsContent data={categories} handleDelete={handleDelete} />
          </Tabs>
        </div>
      ) : (
        <div className="flex h-[70vh] items-center justify-center">
          <Loader size={45} className="rotate-animation" />
        </div>
      )}
    </div>
  );
};
