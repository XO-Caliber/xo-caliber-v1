"use client";
import React, { useEffect, useState } from "react";
import UserSelectList from "@/components/utils/UserSelectList";
import { AssistantDialog } from "../AssistantDialog";
import AddQADiaglog from "../AddQADiaglog";
import AddCategoryDialog from "../AddCategoryDialog";
import { trpc } from "@/app/_trpc/client";
import { Tabs } from "@radix-ui/react-tabs";
import QATabsContent from "../QATabsContent";
import QATabsList from "../QATabsList";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const FirmQA = () => {
  const router = useRouter();
  const categoriesList = trpc.getFirmQuestions.useQuery();
  const { data: categories } = categoriesList;
  console.log(categories);
  const [listCat, setListCat] = useState<Set<string>>(new Set());

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
      {catArray.length > 0 ? (
        <div className="absolute left-[300px] mt-4">
          <Tabs>
            <QATabsList categories={catArray} />
            <QATabsContent data={categories} handleDelete={handleDelete} />
          </Tabs>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FirmQA;
