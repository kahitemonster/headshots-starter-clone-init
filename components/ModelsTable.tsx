"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { modelRowWithSamples } from "@/types/utils";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import { Database } from "@/types/supabase";

type ModelsTableProps = {
  models: modelRowWithSamples[];
};

export default function ModelsTable({ serverModels }: any) {
  const router = useRouter();
  const handleRedirect = (id: number, type: string) => {
    router.push(`/overview/models/generate/${id}/${type}`);
  };

  const supabase = createClientComponentClient<Database>();

  const [models, setModels] = useState<modelRowWithSamples[]>(serverModels);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-models")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "models" },
        (payload: any) => {
          const models = serverModels.map((model: any, index: any)=> {
            if (payload.new.id == model.id) return {...model, ...payload.new}
            else return model
          })
          setModels((prev: any) => prev.map((model: any, index: any)=> {
            if (payload.new.id == model.id) return {...model, ...payload.new}
            else return model
          }))
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="rounded-md">
      <Table className="w-full text-[16px] leading-[60px]">
        <TableHeader>
          <TableRow className="border-[#1d3444] text-white hover:bg-gray-800">
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Samples</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {models?.map((model) => (
            <TableRow
              key={model.modelId}
              className="cursor-pointer h-16 border-[#1d3444] hover:bg-gray-800"
            >
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{model.type}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-shrink-0 items-center">
                  {model.samples.slice(0, 3).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                    </Avatar>
                  ))}
                  {model.samples.length > 3 && (
                    <Badge className="rounded-full h-10 bg-gray-800 text-gray-100">
                      +{model.samples.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {model.status === "finished" ?
                  <button
                    className="flex items-center gap-2 focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => handleRedirect(model.id, model.type!)}
                  >
                    <p>Use</p>
                    {/* <p>Używać</p> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </button>
                  :
                  <button
                    type="button"
                    className="flex items-center gap-2 cursor-not-allowed focus:outline-none text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    disabled
                  >
                    <p>Use</p>
                    {/* <p>Używać</p> */}
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  </button>
                }
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
