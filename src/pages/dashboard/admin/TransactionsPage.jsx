import Transactions from "./components/Transactions";

const TransactionsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Transactions & Payments
        </h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Export Report
        </button>
      </div>
      <Transactions />
    </div>
  );
};

export default TransactionsPage;
