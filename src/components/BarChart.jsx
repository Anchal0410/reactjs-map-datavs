import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ selectedStateBranches }) => {
  if (!selectedStateBranches || selectedStateBranches.length === 0)
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-500 font-medium">
          Select a state to view branch performance metrics
        </div>
      </div>
    );

  const stateName = selectedStateBranches[0]["State Name"];
  const branchNames = selectedStateBranches.map(
    (branch) => branch["Branch Name"]
  );
  const applicationLogin = selectedStateBranches.map(
    (branch) => branch["Application Login"]
  );
  const sanctionCount = selectedStateBranches.map(
    (branch) => branch["Sanction Count"]
  );
  const disbursementCount = selectedStateBranches.map(
    (branch) => branch["Fresh Disbursment count"]
  );

  // Calculate totals for summary
  const totalApplications = applicationLogin.reduce((a, b) => a + b, 0);
  const totalSanctions = sanctionCount.reduce((a, b) => a + b, 0);
  const totalDisbursements = disbursementCount.reduce((a, b) => a + b, 0);

  // Subtle color palette
  const colors = {
    applications: {
      base: "rgba(79, 70, 229, 0.7)",
      border: "rgba(79, 70, 229, 1)",
      light: "rgba(79, 70, 229, 0.1)",
    },
    sanctions: {
      base: "rgba(16, 185, 129, 0.7)",
      border: "rgba(16, 185, 129, 1)",
      light: "rgba(16, 185, 129, 0.1)",
    },
    disbursements: {
      base: "rgba(245, 158, 11, 0.7)",
      border: "rgba(245, 158, 11, 1)",
      light: "rgba(245, 158, 11, 0.1)",
    },
  };

  const data = {
    labels: branchNames,
    datasets: [
      {
        label: "Application Login",
        data: applicationLogin,
        backgroundColor: colors.applications.base,
        borderColor: colors.applications.border,
        borderWidth: 1,
        borderRadius: 3,
        barThickness: 8,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Sanction Count",
        data: sanctionCount,
        backgroundColor: colors.sanctions.base,
        borderColor: colors.sanctions.border,
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 8,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
      {
        label: "Fresh Disbursement",
        data: disbursementCount,
        backgroundColor: colors.disbursements.base,
        borderColor: colors.disbursements.border,
        borderWidth: 1,
        borderRadius: 3,
        barThickness: 8,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        bodyFont: {
          size: 13,
        },
        padding: 12,
        boxPadding: 8,
        borderColor: "rgba(209, 213, 219, 1)",
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => {
            return `${
              tooltipItem.dataset.label
            }: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11,
          },
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        grid: {
          color: "rgba(226, 232, 240, 0.5)",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    barThickness: 8,
    maxBarThickness: 8,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          {stateName} Branch Performance
        </h2>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-sm text-gray-500">
            Performance metrics for {selectedStateBranches.length} branches
          </p>
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
            {stateName}
          </span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.applications.light }}
        >
          <p className="text-sm font-medium text-gray-600">
            Total Applications
          </p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalApplications.toLocaleString()}
          </p>
        </div>
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.sanctions.light }}
        >
          <p className="text-sm font-medium text-gray-600">Total Sanctions</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalSanctions.toLocaleString()}
          </p>
        </div>
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.disbursements.light }}
        >
          <p className="text-sm font-medium text-gray-600">
            Total Disbursements
          </p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalDisbursements.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <div className="h-96">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
