import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Modal from "../../../../components/Modal";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
  editingCategoryId,
  isDeleting,
  isUpdating,
}) => {
  const [modalData, setModalData] = useState(null);

  const handleDeleteClick = (category) => {
    setModalData({
      type: "delete",
      title: "Delete Category?",
      message: `Are you sure you want to delete "${category.name}"?`,
      details: `This will permanently remove the category and all ${
        category.courses || 0
      } associated courses.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => onDelete(category._id),
      onClose: () => setModalData(null),
    });
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-slate-400 mb-4">No categories found</div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-slate-300 font-medium">
                Image
              </th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">
                Category Name
              </th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">
                Description
              </th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">
                Courses
              </th>
              <th className="text-left py-3 px-4 text-slate-300 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                className={`border-b border-slate-700 hover:bg-slate-750 ${
                  editingCategoryId === category._id
                    ? "bg-slate-750 ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <td className="py-4 px-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src={category?.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-100">
                      {category.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      ID: {category._id?.slice(-6) || "N/A"}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span className="text-slate-400 line-clamp-2">
                    {category.description}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center bg-slate-700 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">
                    {category.courses || 0}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      disabled={
                        isUpdating || editingCategoryId === category._id
                      }
                      onClick={() => onEdit(category)}
                      className={`p-2 text-white rounded-lg transition duration-200 ${
                        editingCategoryId === category._id
                          ? "bg-blue-700 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      title="Edit category"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={() => handleDeleteClick(category)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {modalData && <Modal modalData={modalData} />}
    </>
  );
};

export default CategoryTable;

// ============================================
// 3. Usage in CategoryManager.jsx (No changes needed)
// ============================================
// Just import and use CategoryTable as before:
//
// import CategoryTable from "./components/CategoryTable";
//
{
  /* <CategoryTable
  categories={filteredCategories}
  onEdit={startEdit}
  onDelete={handleDeleteCategory}
  editingCategoryId={editingCategory?._id}
  isDeleting={isDeleting}
  isUpdating={isUpdating}
/> */
}
