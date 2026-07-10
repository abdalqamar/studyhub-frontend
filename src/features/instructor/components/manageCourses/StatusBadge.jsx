const StatusBadge = ({ status, userType }) => {
  const statusConfig = {
    approved: {
      text: userType === "instructor" ? "Active" : "Published",
      classes: "bg-teal-soft text-teal",
    },
    published: {
      text: "Published",
      classes: "bg-gold-soft text-gold",
    },
    pending: {
      text: "Pending",
      classes: "bg-accent-blue-soft text-accent-blue",
    },
    rejected: {
      text: "Rejected",
      classes: "bg-danger-soft text-danger",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium font-mono ${config.classes}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.text}
    </span>
  );
};

export default StatusBadge;
