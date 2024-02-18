"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { trpc } from "@/app/_trpc/client";
import ClientTabsContent from "../viewQA/ClientTabsContent";
import QATabsList from "../viewQA/QATabsList";
import { UserProfile } from "@/components/utils/UserProfile";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue
} from "@/components/ui/Select";

interface userProfile {
  userId: string;
  name: string | null | undefined;
  email?: string | null | undefined;
  image?: string | undefined | null;
}

const ClientQA = ({ userId, name, email, image }: userProfile) => {
  const [userType, setUserType] = useState("admin");
  const [catArray, setCatArray] = useState<string[]>([]);
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  let categoriesList;

  userType === "firm"
    ? (categoriesList = trpc.question.getClientQuestions.useQuery())
    : (categoriesList = trpc.question.getClientAdminQuestions.useQuery());
  const { data: categories } = categoriesList;

  useEffect(() => {
    if (categories) {
      const newSet = new Set(listCat);
      categories.forEach((data) => newSet.add(data.name));
      setListCat(newSet);
      setCatArray(Array.from(newSet));
    }
  }, [userType, categories]);

  // console.log(categories);
  console.log("catArray is" + catArray);
  console.log("Liscat is" + listCat.values);

  const handleChange = (userType: string) => {
    setUserType(userType);
  };
  return (
    <div className="m-4 ml-56 text-xl">
      <div className="flex items-center justify-between px-10">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Answers all the questions!</h1>
          <p className="text-sm font-normal text-muted">Here’s a list questions to answer </p>
        </div>
        <div>
          <Select onValueChange={handleChange}>
            <SelectTrigger className="bg-black text-white">
              <SelectValue placeholder="Admin Questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin Questions</SelectItem>
              <SelectItem value="firm">Firm Questions</SelectItem>
            </SelectContent>
          </Select>
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
