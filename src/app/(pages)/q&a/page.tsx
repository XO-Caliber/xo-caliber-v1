import SingleQA from '@/components/pages/q&a/SingleQA';
import { getServerSession } from 'next-auth';
import React from 'react';

const Page = async () => {
  try {
    const session = await getServerSession();
    const data=["Have you independently contributed to original research that has gained national and/or international recognition over the past five years?",
  "Did you publish publicly available outputs, such as books, papers, and conference papers, as the principal author during the specified 5-year period?",
"Did you publish publicly available outputs, such as books, papers, and conference papers, as the principal author during the specified 5-year period?",
"Did you publish publicly available outputs, such as books, papers, and conference papers, as the principal author during the specified 5-year period?",
"Have you been externally awarded research grants and funding as a principal investigator in the last 5 years?",
"Have you held staff responsibilities, including managing research staff, both currently and in previous roles?"]

    
return (
  <div className='absolute m-56 ml-72'>
    {data.map((question, index) => (
      
      <SingleQA key={index} className="bg-[#F6F6F7]" question={question} questionNumber={index=0 + 1} />
    ))}
  </div>
);
} catch (error) {
console.error('Error fetching session:', error);
// Handle errors if necessary
return <div>Error loading data</div>;
}
};

export default Page;
