"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import QAPopUp from "@/components/pages/q&a/QAPopUp";
import AddQA from "@/components/pages/q&a/AddQA";
import { PlusSquare } from "lucide-react";

import { Tabs } from "@radix-ui/react-tabs";
import QATabsList from "../QATabsList";
import CategoryPopUp from "../CategoryPopUp";
import QATabsContent from "../QATabsContent";

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
    <div className={` m-4  text-xl `}>
      <div className={`ml-56 flex font-extrabold `}>
        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 hover:border"
          onClick={handleOpen}
          size={"sm"}
        >
          <PlusSquare size={16} />
          <p className="ml-2">Create Q&A</p>
        </Button>
        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 hover:border"
          size={"sm"}
          onClick={handleCategoryPopOpen}
        >
          <PlusSquare size={16} />
          <p className="ml-2">Create Category</p>
        </Button>
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
