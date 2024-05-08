"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import QATabsList from "../QATabsList";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import FirmTabsContent from "../FirmTabsContent";
import { Loader } from "lucide-react";
import AddQADiaglog from "../../addQA/AddQADiaglog";
import AddCategoryDialog from "../../addCategory/AddCategoryDialog";
import ImportAdmin from "../../firm/ImportAdmin";
import { Checkbox } from "@/components/ui/Checkbox";
import DownloadQuestions from "../../firm/DownloadQuestions";

export const ViewFirmQA = () => {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [listCat, setListCat] = useState<Set<string>>(new Set());
  const categoriesList = trpc.question.getFirmQuestions.useQuery();
  const [categories, setCategories] = useState<any[]>([]);
  const [catArray, setCatArray] = useState<string[]>([]);
  const checked = trpc.question.getClientChecked.useQuery();

  const refetchData = () => {
    categoriesList.refetch();
  };

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

  const { mutate: deleteFirmQuestion } = trpc.question.firmQuestionDelete.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        router.refresh();
        toast({
          title: "Question Deleted",
          description: "Succesfully deleted the question"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    }
  });

  const handleDelete = (questionId: string) => {
    try {
      deleteFirmQuestion(questionId);
    } catch (err) {
      console.log(err);
    }
  };
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

  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
        <p className="m-4 mt-[1.2rem] font-bold text-heading">Caliber </p>
        <div className="mr-4 flex space-x-12">
          <AddQADiaglog refetchData={refetchData} />
          <AddCategoryDialog refetchData={refetchData} />
          <ImportAdmin />
          <DownloadQuestions />
        </div>
      </div>

      <div className="fixed bottom-[960px] left-[1150px] ml-8 mr-12 space-x-16"></div>
      {catArray.length > 0 ? (
        <div className="h-[70vh] p-4">
          {!hidden && (
            <section className="absolute  m-16 mt-28 rounded-lg border-2  shadow-lg">
              <ul className="p-8 text-left  text-base">
                <li className="font-serif">
                  By answering all Yes or No questions, you not only gain insights into the
                  immigration process but also provide with an opportunity to calibrate your profile
                  accurately. These questions are strategically crafted to assess and guide the
                  development of your narrative, especially for potential visa applications such as
                  EB1A, EB2 NIW and O1 visas. It&apos;s crucial to understand that these questions
                  serve as a tool for profiling and narrative building. Importantly, the
                  results/outcome of the exercise do not determine your eligibility for any specific
                  visa category. You might be asked these questions by the firm admin if you are
                  under firm management; otherwise, the XO Caliber team has formulated the questions
                  based on expert opinions and a wealth of acquired knowledge. A compartmentalized
                  approach, coupled with a detailed understanding of immigration crriteria, and a
                  strategic method in approaching the eligitble criteria, facilitates a more
                  informed immigration strategy. By breaking down the process into distinct
                  compartments, each criteria can be systematically addressed, ensuring a
                  comprehensive evaluation of your professional situation. Some questions may appear
                  similar, but they are designed to elicit different responses to better assess and
                  enhance your profile understanding. This approach enables a thorough examination
                  of the immigration criteria, allowing for a strategic and well-informed approach
                  tailored to your specific needs. Whether it involves documentation, eligibility
                  criteria, or procedural steps, this methodical strategy enhances the overall
                  effectiveness of your immigration case.
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
                      className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                    >
                      Please acknowledge that you understand the questions and answer &apos;yes or
                      no&apos; truthfully. If you encounter uncertainty or lack clarity on any
                      question, kindly reach out to the firm administration for assistance if you
                      are enrolled to be managed under Firm (or) you need a deeper understanding of
                      each question to grasp the specific requirements of each compartment before
                      providing your response. In order for the evaluation process to be effective,
                      accurate and reliable information must be provided. Even though the answer
                      choices are binary, we sincerely request that you dedicate ample time—perhaps
                      hours or days—to research or contemplate each question. We encourage you to
                      revisit the questions periodically as you advance on your immigration journey.
                      Please accept sincere thanks and best wishes for your future endeavors on
                      behalf of XO Caliber team.
                    </label>
                  </div>
                </li>
              </ul>
            </section>
          )}
          <Tabs onClick={() => setHidden(true)}>
            <QATabsList categories={catArray} />
            <div className="scrollableContainer mr-2 mt-2 h-[75vh] overflow-y-scroll rounded-md border-2">
              <FirmTabsContent
                data={categories}
                handleDelete={handleDelete}
                refetchData={refetchData}
              />
            </div>
          </Tabs>
        </div>
      ) : (
        <div>
          {categoriesList.isFetching && (
            <div className="flex h-[70vh] items-center justify-center">
              <Loader size={45} className="rotate-animation" />
            </div>
          )}
        </div>
      )}
      {categoriesList.isFetched && !categoriesList.data?.length && (
        <div className="flex h-[70vh] items-center justify-center">
          Please add a question or category
        </div>
      )}
    </div>
  );
};

export default ViewFirmQA;
