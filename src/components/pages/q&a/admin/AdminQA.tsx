"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import QAPopUp from "@/components/pages/q&a/QAPopUp";
import AddQA from "@/components/pages/q&a/AddQA";
import { PlusSquare, UserPlus } from "lucide-react";
import { Tabs } from "@radix-ui/react-tabs";
import QATabsList from "../QATabsList";
import CategoryPopUp from "../CategoryPopUp";
import QATabsContent from "../QATabsContent";
import { Label } from "@/components/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import UserSelectList from "@/components/utils/UserSelectList";

const AdminQA = () => {
  const [data, setData] = useState({
    categories: ["default"],
    datas: [
      {
        category: "default",
        questions: [
          {
            id: 0,
            question: "",
            mark: "10"
          }
        ]
      }
    ]
  });

  const [popOpen, setPopOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("default");
  const [categoryPopOpen, setCategoryPopOpen] = useState(false);
  console.log(selectedTab);

  const handleAddData = (values: any) => {
    setData((prevData) => ({
      categories: [...prevData.categories],
      datas: [...prevData.datas, { category: selectedTab, questions: [values] }]
    }));
    console.log(data);
  };

  const handleDelete = (id: number) => {
    setData((prevData) => ({
      categories: [...prevData.categories],
      datas: [
        ...prevData.datas,
        {
          category: selectedTab,
          questions:
            prevData.datas
              .find((item) => item.category === selectedTab)
              ?.questions?.filter((item) => item.id !== id) || []
        }
      ]
    }));
  };

  const createCategory = (values: string) => {
    setData((prevData) => ({
      categories: [...prevData.categories, values],
      datas: [...prevData.datas]
    }));
  };

  const handleCategoryPopOpen = () => {
    setCategoryPopOpen(!categoryPopOpen);
  };

  const handleOpen = () => {
    setPopOpen(!popOpen);
  };

  return (
    <div className="m-4 ml-56 text-xl ">
      <div className="flex items-center justify-around">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-sm font-normal text-muted">Here’s a list of Bonny davis’s cases</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="ml-4 border-gray-400 font-medium hover:border"
              // onClick={handleOpen}
              size={"sm"}
            >
              <UserPlus size={16} />
              <p className="ml-2">Assign Assistant</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add assistant to this user</DialogTitle>
              <DialogDescription>Select an assistant from the below list:</DialogDescription>
              <div className="flex flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between py-4">
                  <Label htmlFor="name" className="text-right">
                    For User:
                  </Label>
                  {/* <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" /> */}
                  <UserSelectList />
                </div>
                <div className="flex w-full items-center justify-between py-4">
                  <Label htmlFor="username" className="text-right">
                    Assign Assistant:
                  </Label>
                  {/* <Input id="username" defaultValue="@peduarte" className="col-span-3" /> */}
                  <UserSelectList />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-4" variant="primary">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"dark"}
              className="ml-4 border-dashed border-gray-400 font-medium hover:border"
              // onClick={handleOpen}
              size={"sm"}
            >
              <PlusSquare size={16} />
              <p className="ml-2">Create Q&A</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add assistant to this user</DialogTitle>
              <DialogDescription>Select an assistant from the below list:</DialogDescription>

              <QAPopUp handleOpen={handleOpen} handleData={handleAddData} datas={data.datas} />
              <DialogFooter>
                <Button type="submit" className="mt-4" variant="primary">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 hover:border"
          size={"sm"}
          onClick={handleCategoryPopOpen}
        >
          <PlusSquare size={16} />
          <p className="ml-2">Create Category</p>
        </Button>
        <UserSelectList />
      </div>
      {data.categories.length > 0 ? (
        <div className="absolute left-[400px] ">
          <Tabs onValueChange={(value) => setSelectedTab(value)}>
            <QATabsList categories={data.categories} />
            <QATabsContent datas={data.datas} handleDelete={handleDelete} />
          </Tabs>
        </div>
      ) : null}

      {popOpen ? (
        <div className="absolute left-[400px] top-[300px]">
          <QAPopUp handleOpen={handleOpen} handleData={handleAddData} datas={data.datas} />
        </div>
      ) : (
        <></>
      )}
      {categoryPopOpen ? (
        <div className="absolute left-[400px] top-[300px]">
          <CategoryPopUp
            handleCategoryPopOpen={handleCategoryPopOpen}
            createCategory={createCategory}
          />
        </div>
      ) : (
        <></>
      )}
      {/* {data.datas.length > 0
        ? 
        : null} */}
    </div>
  );
};

export default AdminQA;
