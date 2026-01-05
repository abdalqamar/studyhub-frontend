import React from "react";

const SubmitButton = ({ isEditing, loading }) => {
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-md disabled:opacity-60 "
      disabled={!isEditing}
    >
      {loading ? "Updating..." : "Update Details"}
    </button>
  );
};

export default SubmitButton;
