import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedState }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!selectedState)
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-500 font-medium">
          Select a state to view detailed metrics
        </div>
      </div>
    );

  const values = [
    selectedState["SalerTray"],
    selectedState["WIP_CPA"],
    selectedState["Pending_for_allocation"],
    selectedState["CreditPending"],
  ];

  const total = values.reduce((sum, value) => sum + value, 0);

  const baseColors = [
    "rgba(82, 76, 133, 1)",
    "rgba(49, 51, 112, 1)",
    "rgba(25, 3, 153, 1)",
    "rgba(92, 113, 205, 1)",
  ];

  const blurredColors = baseColors.map((color) => color.replace("1)", "0.2)"));

  const labels = ["WIP 1", "WIP CPA", "Pending Allocation", "Credit Pending"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: values.map((_, index) =>
          hoverIndex === null
            ? baseColors[index]
            : hoverIndex === index
            ? baseColors[index]
            : blurredColors[index]
        ),
        borderColor: values.map((_, index) => baseColors[index]),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        bodyFont: {
          size: 14,
        },
        padding: 12,
        boxPadding: 8,
        borderColor: "rgba(209, 213, 219, 1)",
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${
              tooltipItem.label
            }: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 13,
          },
        },
      },
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        setHoverIndex(elements[0].index);
      } else {
        setHoverIndex(null);
      }
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          {selectedState["State Name"]} Metrics Overview
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Distribution of work in progress and pending tasks
        </p>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <div className="aspect-square max-w-md mx-auto">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
