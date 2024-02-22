"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import AssistantTabsContent from "../AssistantTabsContent";

export const ViewAssistantQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getAssistantFirmQuestion.useQuery();
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

  const catArray = Array.from(listCat);

  return (
    <div>
      {catArray.length > 0 ? (
        <div className=" mt-4 h-[90vh]">
          <Tabs>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mt-2 h-[75vh] overflow-y-scroll">
              <AssistantTabsContent data={categories} />
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
        <div className="flex h-[70vh] items-center justify-center">No data found</div>
      )}
    </div>
  );
};
