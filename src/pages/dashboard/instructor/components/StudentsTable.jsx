import { ChartBar, DownloadCloud, Mail, UserX } from "lucide-react";
import formatLastActive from "../../../../utils/formatLastActive";
import { warningToast } from "../../../../utils/toastUtils";
import { useState } from "react";

const StudentsTable = ({ users }) => {
  const [modalData, setModalData] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "suspended":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "inactive":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "suspended":
        return "Suspended";
      case "inactive":
        return "Inactive";
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-900/50 border-b border-slate-700">
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Courses Enrolled
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Last Active
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-700/50">
          {users?.map((user) => {
            const fullName = `${user?.firstName} ${user?.lastName}`;
            return (
              <tr
                key={user._id}
                className="hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-700 flex-shrink-0">
                      <img
                        src={user?.profileImage}
                        alt={fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-base mb-0.5 truncate">
                        {fullName}
                      </div>
                      <div className="text-slate-400 text-sm mb-1 truncate">
                        {user.email}
                      </div>
                      <div className="text-slate-500 text-xs">
                        Joined{" "}
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="text-slate-300 font-medium">
                    {user.coursesEnrolled}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-slate-300">
                    {formatLastActive(user.lastActive)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {getStatusText(user.status)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* 1. View Progress */}
                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                      title="View progress"
                    >
                      <ChartBar size={16} />
                    </button>

                    {/* 2. Send Message */}
                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      className="p-2 text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                      title="Send message"
                    >
                      <Mail size={16} />
                    </button>

                    {/* 3. Remove from Course */}
                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors"
                      title="Remove from course"
                    >
                      <UserX size={16} />
                    </button>

                    {/* 4. Export  */}
                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      className="p-2 text-slate-400 hover:bg-slate-500/10 rounded-lg transition-colors"
                      title="Download report"
                    >
                      <DownloadCloud size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalData && <Modal modalData={modalData} />}
    </div>
  );
};

export default StudentsTable;
