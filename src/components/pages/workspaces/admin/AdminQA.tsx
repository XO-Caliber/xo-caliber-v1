"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import QAPopUp from "@/components/pages/q&a/QAPopUp";
import AddQA from "@/components/pages/q&a/AddQA";

const AdminQA = () => {
  const [data, setData] = useState({
    questions: [
      {
        id: 0,
        question: "",
        mark: 10
      }
    ]
  });

  const [popOpen, setPopOpen] = useState(false);
  // console.log(data.questions.length);

  const handleAddData = (values: any) => {
    setData((prevData) => ({
      questions: [...prevData.questions, values]
    }));
    console.log(data.questions);
  };
  const handleDelete = (id: number) => {
    setData((prevData) => ({
      questions: prevData.questions.filter((item) => item.id !== id)
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
          <QAPopUp handleOpen={handleOpen} handleData={handleAddData} questions={data.questions} />
        </div>
      ) : (
        <></>
      )}
      {data.questions.length > 0
        ? data.questions.map((questions: any, index: any) => (
            <AddQA
              key={index}
              questionNumber={index + 1}
              question={questions.question}
              handleDelete={handleDelete}
              mark={questions.mark}
              id={questions.id}
            />
          ))
        : null}
    </div>
  );
};

export default AdminQA;
