import UsersManagement from "./components/UsersManagement";

const ManageUsers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add User
        </button>
      </div>
      <UsersManagement />
    </div>
  );
};

export default ManageUsers;
