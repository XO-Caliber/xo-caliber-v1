"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { trpc } from "@/app/_trpc/client";
import ClientTabsContent from "../viewQA/ClientTabsContent";
import QATabsList from "../viewQA/QATabsList";
import { UserProfile } from "@/components/utils/UserProfile";

interface userProfile {
  userId: string;
  name: string | null | undefined;
  email?: string | null | undefined;
  image?: string | undefined | null;
}

const ClientQA = ({ userId, name, email, image }: userProfile) => {
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
    <div className="m-4 ml-56 text-xl">
      <div className="flex items-center justify-between px-10">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Answers all the questions!</h1>
          <p className="text-sm font-normal text-muted">Here’s a list questions to answer </p>
        </div>
        <UserProfile name={name} email={email} image={image} />
      </div>
      {listCat.size > 0 && (
        <div className="mt-4">
          <Tabs>
            <QATabsList categories={catArray} />
            <ClientTabsContent data={categories} userId={userId} />
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ClientQA;
