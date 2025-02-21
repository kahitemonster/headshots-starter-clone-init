import { Button } from "@/components/ui/button";
import { modelRowWithSamples } from "@/types/utils";
import Link from "next/link";
import { FaImages } from "react-icons/fa";
import ModelsTable from "../ModelsTable";

export const revalidate = 0;

type ClientSideModelsListProps = {
  serverModels: modelRowWithSamples[] | [];
};

export default function ClientSideModelsList({
  serverModels,
}: ClientSideModelsListProps) {
  return (
    <div id="train-model-container" className="w-full mt-[90px] mb-[40px]">
      {serverModels && serverModels.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 w-full justify-between items-center text-center text-white">
            <h1>Charaters</h1>
            {/* <h1>Twoje modele</h1> */}
            <Link href="/overview/models/train" className="w-fit">
              <button
                className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                <p>Generate Charater</p>
                <svg className="h-6 w-6 text-white-500" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline 
                    points="7.5 4.21 12 6.81 16.5 4.21"
                  />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </button>
            </Link>
          </div>
          <ModelsTable serverModels={serverModels} />
        </div>
      )}
      {serverModels && serverModels.length === 0 && (
        <div className="flex flex-col gap-4 items-center">
          <FaImages size={64} className="text-gray-500" />
          <h1 className="text-2xl">
            Get started by training your first model.
          </h1>
          <div>
            <Link href="/overview/models/train">
              <Button size={"lg"}>
                Generate character
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
