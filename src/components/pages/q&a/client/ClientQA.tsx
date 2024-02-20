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
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

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
  const notes = trpc.note.getQANotes.useQuery();
  const initialNotes = notes.data || "";
  const [Note, setNote] = useState(initialNotes);
  console.log(initialNotes);

  const { mutate: updateNote } = trpc.note.addQANotes.useMutation({
    onSuccess({ success }) {
      notes.refetch();
      if (success) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(notes, null, 2)}</code>
            </pre>
          )
        });
      }
    }
  });
  const notesUpdate = () => {
    try {
      updateNote(Note);
    } catch (err) {}
  };
  useEffect(() => {
    setNote(initialNotes);
  }, [notes]);
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
    setListCat(new Set());
    setCatArray([]);
  };

  return (
    <div className="ml-56 mt-2 text-xl">
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
      {listCat.size > 0 ? (
        <div>
          <div className="mt-4 h-[50vh] overflow-y-scroll">
            <Tabs>
              <QATabsList categories={catArray} />
              <ClientTabsContent data={categories} userId={userId} />
            </Tabs>
          </div>
          <section className="relative  flex h-full w-full flex-col justify-between rounded-md  border-2 border-x-0 p-2 pr-0">
            <h1 className="text-lg font-semibold">Your Notes:</h1>
            <span className="block w-full border-[1px] border-border "></span>
            <Textarea
              value={Note}
              className="my-2 h-[250px] resize-none text-base font-semibold italic focus-visible:ring-0"
              placeholder="Tell us a little bit about yourself"
              onChange={(e) => setNote(e.target.value)}
            />
            <form onSubmit={notesUpdate}>
              <Button variant={"destructive"}>Save </Button>
            </form>
          </section>
        </div>
      ) : (
        <div className="flex h-[70vh] items-center justify-center">
          <Loader size={45} className="rotate-animation" />
        </div>
      )}
    </div>
  );
};

export default ClientQA;
