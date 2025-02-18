import { useState } from "react";
import IndiaMap from "./components/IndiaMap";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import BranchTable from "./components/BranchTable";
import "./App.css";

export default function Dashboard() {
  const [selectedStateBranches, setSelectedStateBranches] = useState([]);

  return (
    <div className=" text-white min-h-screen">
      <h1 className="text-4xl font-bold text-left ml-4">State-Wise Data</h1>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="md:w-2/3 w-full flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <IndiaMap onStateClick={setSelectedStateBranches} />
            {selectedStateBranches.length > 0 && (
              <div className="mt-6">
                <BranchTable selectedStateBranches={selectedStateBranches} />
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3 w-full flex flex-col space-y-6">
          {selectedStateBranches.length > 0 && (
            <>
              <PieChart selectedState={selectedStateBranches[0]} />
              <BarChart selectedStateBranches={selectedStateBranches} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
