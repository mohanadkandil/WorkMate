import React from "react";
import { Trash } from "../../../icons";

export default function Projects() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex w-[700px] items-center justify-between rounded-xl border-2 border-primary p-8">
        <div className="flex">
          <div className="mr-16 flex flex-col">
            <span className="text-2xl font-medium">Project Name</span>
            <span className="text-sm font-medium text-gray-400">
              2/7 Tasks completed
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative h-4 w-[240px] rounded-lg bg-[#D9D9D9]">
              <div className="absolute left-0 h-full rounded-lg bg-primary"></div>
            </div>
            <span className="text-xl font-medium">0%</span>
          </div>
        </div>
        <div className="flex">
          <button onClick={() => null}>
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
