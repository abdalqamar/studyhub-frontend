import UsersManagement from "../components/UsersManagement";

const ManageUsers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
      </div>
      <UsersManagement />
    </div>
  );
};

export default ManageUsers;
