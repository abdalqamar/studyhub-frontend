import AnalyticsCharts from "./components/charts/AnalyticsCharts";

const Reports = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Generate Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Export Data
          </button>
        </div>
      </div>
      <AnalyticsCharts />
    </div>
  );
};

export default Reports;
