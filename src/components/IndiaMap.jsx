import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const IndiaMap = ({ onStateClick }) => {
  const [geoData, setGeoData] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    fetch("/india-map.json")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error loading India map:", error));

    fetch("/stateData.json")
      .then((response) => response.json())
      .then((data) => setStateData(data))
      .catch((error) => console.error("Error loading state data:", error));
  }, []);

  const getStateColor = (stateBranches) => {
    if (!stateBranches.length) return "#E5E7EB";
    const branchCount = stateBranches.length;
    if (branchCount > 20) return "#1E40AF";
    if (branchCount > 15) return "#2563EB";
    if (branchCount > 10) return "#3B82F6";
    if (branchCount > 5) return "#60A5FA";
    return "#93C5FD";
  };

  if (!geoData) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-gray-500 flex flex-col items-center space-y-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-medium">Loading Map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              India State-wise Branch Data
            </h2>
            {selectedState && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600">Selected State:</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {selectedState}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="p-6">
        <div className="relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1000, center: [80, 22] }}
            width={900}
            height={600}
            className="w-full"
          >
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.NAME_1;
                  const stateBranches = stateData.filter(
                    (s) => s["State Name"] === stateName
                  );
                  const isSelected = selectedState === stateName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent({
                          stateName,
                          branches: stateBranches,
                        });
                      }}
                      onMouseLeave={() => setTooltipContent(null)}
                      onClick={() => {
                        setSelectedState(stateName);
                        onStateClick(stateBranches);
                      }}
                      style={{
                        default: {
                          fill: getStateColor(stateBranches),
                          stroke: "#CBD5E1",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#F59E0B",
                          stroke: "#CBD5E1",
                          strokeWidth: 1,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#D97706",
                          stroke: "#CBD5E1",
                          strokeWidth: 1,
                          outline: "none",
                        },
                      }}
                      className={`transition-colors duration-200 ${
                        isSelected ? "stroke-2 stroke-amber-500" : ""
                      }`}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Fixed Position Tooltip */}
          {tooltipContent && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl border border-gray-100 p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 gap-4">
                  <h3 className="font-semibold text-gray-800">
                    {tooltipContent.stateName}
                  </h3>
                  <span className="text-sm text-blue-600 font-medium">
                    {tooltipContent.branches.length} Branches
                  </span>
                </div>

                {tooltipContent.branches.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
                    <ul className="space-y-1">
                      {tooltipContent.branches.map((branch, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                        >
                          {branch["Branch Name"]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No branches in this state
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
