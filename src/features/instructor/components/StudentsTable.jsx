import Modal from "@/shared/components/Modal";
import formatLastActive from "@/shared/utils/formatLastActive";
import { warningToast } from "@/shared/utils/toastUtils";
import { ChartBar, DownloadCloud, Mail, UserX } from "lucide-react";
import { useState } from "react";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const iconBtn =
  "w-8 h-8 flex items-center justify-center rounded-lg border bg-transparent transition-all duration-150";

const StudentsTable = ({ users, handleRemoveStudent }) => {
  const [modalData, setModalData] = useState(null);

  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return { text: "Active", classes: "bg-teal-soft text-teal" };
      case "suspended":
        return { text: "Suspended", classes: "bg-danger-soft text-danger" };
      case "inactive":
        return { text: "Inactive", classes: "bg-surface-2 text-text-3" };
      default:
        return { text: status, classes: "bg-surface-2 text-text-3" };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-2 border-b border-border">
            <th className="px-5 py-3.5 text-left font-mono text-[10.5px] tracking-wider uppercase text-text-3">
              User
            </th>
            <th className="px-5 py-3.5 text-left font-mono text-[10.5px] tracking-wider uppercase text-text-3">
              Courses enrolled
            </th>
            <th className="px-5 py-3.5 text-left font-mono text-[10.5px] tracking-wider uppercase text-text-3">
              Last active
            </th>
            <th className="px-5 py-3.5 text-left font-mono text-[10.5px] tracking-wider uppercase text-text-3">
              Status
            </th>
            <th className="px-5 py-3.5 text-right font-mono text-[10.5px] tracking-wider uppercase text-text-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => {
            const fullName = `${user?.firstName} ${user?.lastName}`;
            const status = getStatusConfig(user.status);

            return (
              <tr
                key={user._id}
                className="border-t border-border hover:bg-surface-2/60 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-border-strong flex-shrink-0 bg-gradient-to-br from-accent-blue to-teal flex items-center justify-center">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-display text-[12px] font-bold text-bg">
                          {getInitials(fullName)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-medium text-text-1 truncate">
                        {fullName}
                      </div>
                      <div className="text-text-3 text-xs truncate">
                        {user.email}
                      </div>
                      <div className="text-text-3 text-[10.5px] font-mono mt-0.5">
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

                <td className="px-5 py-3.5 font-mono text-[13px] text-text-1">
                  {user.coursesEnrolled ?? 0}
                </td>

                <td className="px-5 py-3.5 text-[13px] text-text-2">
                  {user.lastActive
                    ? formatLastActive(user.lastActive)
                    : "Never"}
                </td>

                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium font-mono ${status.classes}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {status.text}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      title="View progress"
                      className={`${iconBtn} border-accent-blue-soft text-accent-blue hover:bg-accent-blue-soft`}
                    >
                      <ChartBar size={14} />
                    </button>

                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      title="Send message"
                      className={`${iconBtn} border-teal-soft text-teal hover:bg-teal-soft`}
                    >
                      <Mail size={14} />
                    </button>

                    <button
                      onClick={() =>
                        setModalData({
                          type: "delete",
                          title: "Remove student?",
                          message: `Remove ${fullName} from this course?`,
                          details:
                            "This will unenroll the student. This action cannot be undone.",
                          confirmText: "Remove",
                          cancelText: "Cancel",
                          onConfirm: () => {
                            handleRemoveStudent?.(user);
                            setModalData(null);
                          },
                          onClose: () => setModalData(null),
                        })
                      }
                      title="Remove from course"
                      className={`${iconBtn} border-danger-soft text-danger hover:bg-danger-soft`}
                    >
                      <UserX size={14} />
                    </button>

                    <button
                      onClick={() =>
                        warningToast("This feature is not implemented yet.")
                      }
                      title="Download report"
                      className={`${iconBtn} border-border-strong text-text-2 hover:bg-surface-raised hover:text-text-1`}
                    >
                      <DownloadCloud size={14} />
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
