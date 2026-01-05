const StatusBadge = ({ status, userType }) => {
  const statusConfig = {
    approved: {
      text: userType === "instructor" ? "Active" : "Published",
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      dotColor: "bg-emerald-400",
    },
    published: {
      text: "Published",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      dotColor: "bg-blue-400",
    },
    pending: {
      text: "Pending ",
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      dotColor: "bg-amber-400",
    },
    rejected: {
      text: "Rejected",
      color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      dotColor: "bg-rose-400",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse`}
      />
      <span>{config.text}</span>
    </span>
  );
};

export default StatusBadge;
