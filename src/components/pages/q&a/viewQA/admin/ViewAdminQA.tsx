"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import AllTabsContent from "../AllTabsContent";

export const ViewAdminQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.getAdminQuestions.useQuery();
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

  const { mutate: deleteAdminQuestion } = trpc.adminQuestionDelete.useMutation({
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
  console.log(catArray.length);

  const handleDelete = (questionId: string) => {
    try {
      deleteAdminQuestion(questionId);
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
            <AllTabsContent data={categories} handleDelete={handleDelete} />
          </Tabs>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
