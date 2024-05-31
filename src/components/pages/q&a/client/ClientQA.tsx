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
import { Info, Loader } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import InstructionVideo from "../../home/InstructionVideo";

interface userProfile {
  userId: string;
  name: string | null | undefined;
  email?: string | null | undefined;
  image?: string | undefined | null;
}

const ClientQA = ({ userId, name, email, image }: userProfile) => {
  const { data: hasFirm } = trpc.home.checkHasFirm.useQuery();
  // const [userType, setUserType] = useState("firm");
  const [hidden, setHidden] = useState(false);
  const [catArray, setCatArray] = useState<string[]>([]);
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  let categoriesList;

  hasFirm !== false
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
  }, [hasFirm, categories]);

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
    // setUserType(userType);
    setHidden(false);
  };
  return (
    <div className=" ml-56 text-xl ">
      <div className="flex h-[68px] items-center justify-between  border-2 border-l-0 bg-white pr-4">
        <div className="flex items-center justify-center gap-x-1">
          {" "}
          <p className="m-4 mr-1 mt-[1.2rem] font-bold text-heading">Caliber</p>
          <Dialog>
            <DialogTrigger asChild>
              <Info size={18} className="mt-1 cursor-pointer text-heading" />
            </DialogTrigger>
            <DialogContent>
              By answering a series of Yes or No weighted questions for each section, you provide an
              opportunity to calibrate your own profile accurately. Weighted questions of each
              section are strategically crafted based on expert opinions and a wealth of acquired
              knowledge to assess and guide the development of your narrative for your self
              petitioned immigration cases. This process serves as the foundation for building a
              compelling narrative that aligns with the criteria of your desired visa category.
            </DialogContent>
          </Dialog>
        </div>
        <InstructionVideo videoLink="https://www.youtube.com/embed/wY8ulLafP_g?si=hZ5EHaJGX99O53eb" />
      </div>
      {listCat.size > 0 && (
        <div>
          <ResizablePanelGroup direction="vertical" className="min-h-[90vh] max-w-full ">
            <ResizablePanel defaultSize={70}>
              {!hidden && (
                <section className="absolute m-16 mt-32 rounded-lg border-2 shadow-lg">
                  <ul className="p-8 text-left  text-base">
                    <li className="font-serif ">
                      By answering all Yes or No questions, you not only gain insights into the
                      immigration process but also provide with an opportunity to calibrate your
                      profile accurately. These questions are strategically crafted to assess and
                      guide the development of your narrative, especially for potential visa
                      applications such as EB1A, EB2 NIW and O1 visas. It&apos;s crucial to
                      understand that these questions serve as a tool for profiling and narrative
                      building. Importantly, the results/outcome of the exercise do not determine
                      your eligibility for any specific visa category. You might be asked these
                      questions by the firm admin if you are under firm management; otherwise, the
                      XO Caliber team has formulated the questions based on expert opinions and a
                      wealth of acquired knowledge. A compartmentalized approach, coupled with a
                      detailed understanding of immigration criteria, and a strategic method in
                      approaching the eligitble criteria, facilitates a more informed immigration
                      strategy. By breaking down the process into distinct compartments, each
                      criteria can be systematically addressed, ensuring a comprehensive evaluation
                      of your professional situation. Some questions may appear similar, but they
                      are designed to elicit different responses to better assess and enhance your
                      profile understanding. This approach enables a thorough examination of the
                      immigration criteria, allowing for a strategic and well-informed approach
                      tailored to your specific needs. Whether it involves documentation,
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
                          className="text-lgfont-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                        >
                          Please acknowledge that you understand the questions and answer &apos;yes
                          or no&apos; truthfully. If you encounter uncertainty or lack clarity on
                          any question, kindly reach out to the firm administration for assistance
                          if you are enrolled to be managed under Firm (or) you need a deeper
                          understanding of each question to grasp the specific requirements of each
                          compartment before providing your response. In order for the evaluation
                          process to be effective, accurate and reliable information must be
                          provided. Even though the answer choices are binary, we sincerely request
                          that you dedicate ample time—perhaps hours or days—to research or
                          contemplate each question. We encourage you to revisit the questions
                          periodically as you advance on your immigration journey. Please accept
                          sincere thanks and best wishes for your future endeavors on behalf of XO
                          Caliber team.
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
              )}
              <Tabs onClick={() => setHidden(true)}>
                <QATabsList categories={catArray} />

                <div className="scrollableContainer m-4 mt-2 h-[60vh] overflow-y-scroll rounded-md  ">
                  <ClientTabsContent data={categories} userId={userId} />
                </div>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
      {!listCat.size && (
        <div>
          {(categoriesList.isFetching || categoriesList.isRefetching) && (
            <div className="flex h-[70vh] items-center justify-center">
              <Loader size={45} className="rotate-animation" />
            </div>
          )}
          {categoriesList.isFetched && !categoriesList.data?.length && (
            <div className="flex h-[70vh] items-center justify-center">No question available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientQA;
