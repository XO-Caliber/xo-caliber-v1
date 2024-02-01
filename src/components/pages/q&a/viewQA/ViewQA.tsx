"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "./QATabsList";
import FirmQATabsContent from "./FirmQATabsContent";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const ViewQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.getFirmQuestions.useQuery();
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

  const { mutate: deleteFirmQuestion } = trpc.firmQuestionDelete.useMutation({
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
      deleteFirmQuestion(questionId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {catArray.length > 0 ? (
        <div className="mt-4">
          <Tabs>
            <QATabsList categories={catArray} />
            <FirmQATabsContent data={categories} handleDelete={handleDelete} />
          </Tabs>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
