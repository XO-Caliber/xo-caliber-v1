import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import AllTabsContent from "../AllTabsContent";
import { Loader } from "lucide-react";

export const ViewAdminQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getAdminQuestions.useQuery();
  const { data: categories } = categoriesList;

  // Use useEffect to update listCat when categories change
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
      {catArray.length > 0 ? (
        <div className="scrollableContainer mt-4 overflow-y-scroll">
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
