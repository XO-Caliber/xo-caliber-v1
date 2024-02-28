"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import AssistantTabsContent from "../AssistantTabsContent";
import DownloadAssistantQuestions from "./DownloadAssistantQuestions";

export const ViewAssistantQA = () => {
  const router = useRouter();
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getAssistantFirmQuestion.useQuery();
  const [categories, setCategories] = useState<any[]>([]);
  const [catArray, setCatArray] = useState<string[]>([]);

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

  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Caliber Q&A</p>
        <DownloadAssistantQuestions />
      </div>
      {catArray.length > 0 ? (
        <div className=" h-[90vh]">
          <Tabs>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mr-2  mt-2 h-[75vh] overflow-y-scroll">
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
