import React from "react";

const getCellColor = (value) => {
  // Enhanced color ranges with better visibility
  const ranges = [
    { min: 0, max: 3, color: "bg-rose-200 text-rose-900" },
    { min: 3, max: 6, color: "bg-blue-200 text-blue-900" },
    { min: 6, max: 9, color: "bg-yellow-200 text-yellow-900" },
    { min: 9, max: 12, color: "bg-cyan-200 text-cyan-900" },
    { min: 12, max: Infinity, color: "bg-green-200 text-green-900" },
  ];

  const range = ranges.find((r) => value >= r.min && value < r.max);
  return range ? range.color : "bg-gray-200 text-gray-900";
};

const BranchTable = ({ selectedStateBranches }) => {
  if (!selectedStateBranches || selectedStateBranches.length === 0)
    return (
      <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg border border-gray-200">
        Select a state to view branch data.
      </div>
    );

  const loginValues = selectedStateBranches.map(
    (b) => b["Application Login"] || 0
  );
  const sanctionValues = selectedStateBranches.map(
    (b) => b["Sanction Count"] || 0
  );
  const wipValues = selectedStateBranches.map((b) => b["WIP_CPA"] || 0);
  const ftrValues = selectedStateBranches.map((b) => b["FTR"] || 0);

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedStateBranches[0]["State Name"]} Branch Performance
            </h2>
            <p className="mt-1 text-gray-500">
              {selectedStateBranches.length} Active Branches
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">
                {loginValues.reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Sanctions</p>
              <p className="text-2xl font-bold text-gray-900">
                {sanctionValues.reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-6 p-6 bg-gray-50 border-b border-gray-200">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">Total Logins</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {loginValues.reduce((a, b) => a + b, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">
            Sanction Amount
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {sanctionValues.reduce((a, b) => a + b, 0).toLocaleString()} CR
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">
            Fresh Disbursements
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {wipValues.reduce((a, b) => a + b, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 font-medium">Average FTR</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {(
              ftrValues.reduce((a, b) => a + b, 0) /
              selectedStateBranches.length
            ).toFixed(1)}
            %
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold text-gray-900 border-b border-gray-200 min-w-[200px]">
                  Branch
                </th>
                <th className="px-6 py-4 bg-gray-100 text-center text-sm font-semibold text-gray-900 border-b border-gray-200 min-w-[120px]">
                  FTR%
                </th>
                <th className="px-6 py-4 bg-gray-100 text-center text-sm font-semibold text-gray-900 border-b border-gray-200 min-w-[120px]">
                  WIP
                </th>
                <th className="px-6 py-4 bg-gray-100 text-center text-sm font-semibold text-gray-900 border-b border-gray-200 min-w-[120px]">
                  App. Login
                </th>
                <th className="px-6 py-4 bg-gray-100 text-center text-sm font-semibold text-gray-900 border-b border-gray-200 min-w-[120px]">
                  Sanction
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedStateBranches.map((branch, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-white">
                    {branch["Branch Name"]}
                  </td>
                  <td
                    className={`px-6 py-4 text-center text-sm font-medium ${getCellColor(
                      branch["FTR"]
                    )}`}
                  >
                    {branch["FTR"]}%
                  </td>
                  <td
                    className={`px-6 py-4 text-center text-sm font-medium ${getCellColor(
                      branch["WIP_CPA"]
                    )}`}
                  >
                    {branch["WIP_CPA"].toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-center text-sm font-medium ${getCellColor(
                      branch["Application Login"]
                    )}`}
                  >
                    {branch["Application Login"].toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-center text-sm font-medium ${getCellColor(
                      branch["Sanction Count"]
                    )}`}
                  >
                    {branch["Sanction Count"].toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BranchTable;
