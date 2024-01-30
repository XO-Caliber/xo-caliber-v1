"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import AnsTabsContent from "../AnsTabsContent";

const ClientQA = () => {
  const categoriesList = trpc.getClientQuestions.useQuery();
  const { data: categories } = categoriesList;
  console.log(categories);
  const [listCat, setListCat] = useState<Set<string>>(new Set());

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
    <div className="w-1400px m-4 ml-56 h-fit text-xl ">
      <div className="absolute left-[800px] mt-4">
        {listCat.size > 0 && (
          <div className="relative right-[550px] m-24  flex items-center justify-center">
            <Tabs>
              <QATabsList categories={catArray} />
              <AnsTabsContent data={categories} />
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientQA;
