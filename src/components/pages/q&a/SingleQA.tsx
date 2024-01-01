"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
import { buttonVariants } from "@/components/ui/Button"
import { useState } from "react"
import { log } from "console"
import { Value } from "@radix-ui/react-select"

export const SingleQA = () => {
    const [visitedValue,setVisitedValue]=useState("select")
    console.log(visitedValue)
    return (
        <div className="absolute pl-12 mt-32 h-screen ml-56 bg-white">
            <div className=" flex border w-[1279px] h-16 items-center justify-center bg-slate-200 rounded-lg">
                <div className="pl-4 w-92 mr-12 ">Have you independently contributed to original research that has gained national and/or international recognition over the past five years? dsfSEDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG </div>
                <div className="mr-4">
                    <Select >
                        <SelectTrigger className={`${visitedValue=="yes"?"bg-black":""} ${visitedValue==="no"?"bg-[#64748B":""} w-[150px]` }>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="yes" onClick={()=>setVisitedValue("yes")}>Yes</SelectItem>
                            <SelectItem value="no" onClick={()=>setVisitedValue("no")}>No</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

            </div>
        </div>
    )
}

export default SingleQA