"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import QAPopUp from "@/components/pages/q&a/QAPopUp";
import AddQA from "@/components/pages/q&a/AddQA";

const AdminQA = () => {
  const [data, setData] = useState({
    questions: [{}]
  });
  const [popOpen, setPopOpen] = useState(false);
  console.log(data.questions.length);

  const handleAddData = (values: any) => {
    setData((prevData) => ({
      questions: [...prevData.questions, values]
    }));
  };
  const handleDelete = (questionId: number) => {
    setData((prevData) => ({
      questions: prevData.questions.filter((items) => items !== questionId)
    }));
  };

  const handleOpen = () => {
    setPopOpen(!popOpen);
  };
  return (
    <div className={` m-4  text-xl `}>
      <div className={`ml-56 flex font-extrabold `}>
        {/* <CardTitle className="mr-8">Welcome {session?.user?.name?.toLowerCase()}</CardTitle> */}
        <Button variant={"dark"} onClick={handleOpen}>
          Create QA
        </Button>
      </div>
      {popOpen ? (
        <div className="absolute left-[400px] ">
          <QAPopUp handleOpen={handleOpen} handleData={handleAddData} />
        </div>
      ) : (
        <></>
      )}
      {data.questions.length ? (
        data.questions.map((questions: any, index: any) => (
          <AddQA
            key={index}
            questionNumber={index + 1}
            question={questions.question}
            handleDelete={handleDelete}
            mark={questions.mark}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminQA;
