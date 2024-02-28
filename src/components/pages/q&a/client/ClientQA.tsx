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

import { ClientQANotes } from "./ClientQANotes";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import { Checkbox } from "@/components/ui/Checkbox";
import { Toast } from "@/components/ui/Toast";
import { Loader } from "lucide-react";

interface userProfile {
  userId: string;
  name: string | null | undefined;
  email?: string | null | undefined;
  image?: string | undefined | null;
}

const ClientQA = ({ userId, name, email, image }: userProfile) => {
  const [userType, setUserType] = useState("firm");
  const [hidden, setHidden] = useState(false);
  const [catArray, setCatArray] = useState<string[]>([]);
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  let categoriesList;

  userType === "firm"
    ? (categoriesList = trpc.question.getClientQuestions.useQuery())
    : (categoriesList = trpc.question.getClientAdminQuestions.useQuery());

  const { data: categories } = categoriesList;
  const checked = trpc.question.getClientChecked.useQuery();

  useEffect(() => {
    if (categories) {
      const newSet = new Set(listCat);
      categories.forEach((data) => newSet.add(data.name));
      setListCat(newSet);
      setCatArray(Array.from(newSet));
    }
  }, [userType, categories]);

  const { mutate: updateChecked } = trpc.question.addClientChecked.useMutation({
    onSuccess({ success }) {
      checked.refetch();
      if (success) {
      }
    }
  });
  const onSubmit = () => {
    try {
      updateChecked();
    } catch (err) {}
  };

  const handleChange = (userType: string) => {
    setListCat(new Set());
    setCatArray([]);
    setUserType(userType);
    setHidden(false);
  };
  return (
    <div className=" ml-56 text-xl">
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Caliber Q&A</p>
        <span className="mr-10 w-32">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="bg-black text-white">
              <SelectValue placeholder="Firm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="firm">Firm</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>
      {listCat.size > 0 && (
        <div>
          <ResizablePanelGroup direction="vertical" className="min-h-[90vh] max-w-full">
            <ResizablePanel defaultSize={70}>
              {!hidden && (
                <section className="absolute  m-16 mt-44 rounded-lg border-2  shadow-lg">
                  <ul className="p-8 text-left  text-base">
                    <li className="font-serif">
                      By answering all Yes or No questions, you not only gain insights into the
                      immigration process but also provide with an opportunity to calibrate your
                      profile accurately. These questions are strategically crafted to assess and
                      guide the development of your narrative, especially for potential visa
                      applications such as EB1A, EB2 NIW, O1 Visa, or other immigrant visas.
                      It&apos;s crucial to understand that these questions serve as a tool for
                      profiling and narrative building. Importantly, they do not determine your
                      eligibility for any specific visa category. You might be asked these questions
                      by the firm admin if you are under firm management; otherwise, the XO Caliber
                      team has formulated them based on expert opinions and a wealth of acquired
                      knowledge. A compartmentalized approach, coupled with a detailed understanding
                      of immigration requirements, and a strategic method in approaching these
                      requirements, facilitates a more informed immigration strategy. By breaking
                      down the process into distinct compartments, each requirement can be
                      systematically addressed, ensuring a comprehensive evaluation of your
                      professional situation. Some questions may appear similar, but they are
                      designed to elicit different responses to better assess and enhance your
                      profile understanding. This meticulous approach enables a thorough examination
                      of the immigration landscape, allowing for a strategic and well-informed
                      strategy tailored to your specific needs. Whether it involves documentation,
                      eligibility criteria, or procedural steps, this methodical strategy enhances
                      the overall effectiveness of your immigration case.
                    </li>
                    <li className="mt-8 flex rounded-lg border bg-secondary p-2 py-6 ">
                      <Checkbox
                        id="terms1"
                        disabled={checked.data}
                        onClick={() => onSubmit()}
                        checked={checked.data}
                      />
                      <div className="grid gap-1.5 pl-2 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                        >
                          Please acknowledge that you understand the questions and answer
                          &apos;yes&apos; or &apos;no&apos; truthfully. If you encounter uncertainty
                          or lack clarity on any question, kindly reach out to the firm
                          administration for assistance if you are enrolled to managed under Firm
                          (or) you need a deeper understanding of each question to grasp the
                          specific requirements of each compartment before providing your response.
                          In order for the evaluation process to be effective, accurate and reliable
                          information must be provided. Please accept sincere thanks and best wishes
                          for your future endeavors on behalf of XO Caliber team.
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
              )}
              <Tabs onClick={() => setHidden(true)}>
                <QATabsList categories={catArray} />

                <div className="scrollableContainer mt-2 h-[60vh] overflow-y-scroll bg-white shadow-md">
                  <ClientTabsContent data={categories} userId={userId} />
                </div>
              </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={15.6}>
              <ClientQANotes />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
      {!listCat.size &&
        (userType === "firm" ? (
          <div className="flex h-[70vh] items-center justify-center">
            <text>Join under a firm to view questions</text>
          </div>
        ) : (
          <div className="flex h-[70vh] items-center justify-center">
            <Loader size={45} className="rotate-animation" />
          </div>
        ))}
    </div>
  );
};

export default ClientQA;
