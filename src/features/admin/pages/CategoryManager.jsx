import { useState } from "react";
import { Plus } from "lucide-react";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/features/categories/hooks/useCategories";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import CategoryForm from "@/features/categories/components/CategoryForm";
import SearchBar from "@/shared/layout/SearchBar";
import CategoryTable from "@/features/categories/components/CategoryTable";
import CategoryStats from "@/features/categories/components/CategoryStats";

const CategoryManager = () => {
  const { data: categories = [] } = useCategories();
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.description.trim()) {
      errorToast("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);

    if (newCategory.image && newCategory.image instanceof File) {
      formData.append("image", newCategory.image);
    }

    createCategory(formData, {
      onSuccess: () => {
        setNewCategory({ name: "", description: "", image: null });
        setIsAdding(false);
        successToast("Category created successfully!");
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message || "Failed to create category");
      },
    });
  };

  // Handle deleting a category
  const handleDeleteCategory = (id) => {
    deleteCategory(id, {
      onSuccess: () => {
        successToast("Category deleted successfully!");
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message || "Failed to delete category");
      },
    });
  };

  // Start editing a category
  const startEdit = (category) => {
    setEditingCategory(category);
    setEditForm({
      name: category.name,
      description: category.description,
      image: category.image,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingCategory(null);
    setEditForm({ name: "", description: "", image: null });
  };

  // Handle update category
  const handleUpdateCategory = () => {
    if (!editForm.name.trim() || !editForm.description.trim()) {
      errorToast("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);

    if (editForm.image && editForm.image instanceof File) {
      formData.append("image", editForm.image);
    } else if (editForm.image === null) {
      formData.append("image", "");
    }

    updateCategory(
      { id: editingCategory._id, formData },
      {
        onSuccess: () => {
          setEditingCategory(null);
          setEditForm({ name: "", description: "", image: null });
          successToast("Category updated successfully!");
        },
      }
    );
  };

  // Cancel add mode
  const cancelAdd = () => {
    setIsAdding(false);
    setNewCategory({ name: "", description: "", image: null });
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg text-text-1">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-1">
            Category Management
          </h1>
          <p className="text-text-2 mt-2">
            Create, read, update, and delete categories
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Add/Edit Category Form */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-[14px] border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-text-1">
                {editingCategory
                  ? "Edit Category"
                  : isAdding
                    ? "Add New Category"
                    : "Category Form"}
              </h2>

              {editingCategory ? (
                <CategoryForm
                  mode="edit"
                  formData={editForm}
                  onFormChange={setEditForm}
                  onSubmit={handleUpdateCategory}
                  onCancel={cancelEdit}
                  isLoading={isUpdating}
                />
              ) : isAdding ? (
                <CategoryForm
                  mode="add"
                  formData={newCategory}
                  onFormChange={setNewCategory}
                  onSubmit={handleAddCategory}
                  onCancel={cancelAdd}
                  isLoading={isCreating}
                />
              ) : (
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:opacity-90 text-bg font-semibold py-3 px-4 rounded-lg transition-opacity"
                >
                  <Plus className="h-5 w-5" />
                  Add New Category
                </button>
              )}

              {/* Stats */}
              <CategoryStats categories={categories} />

              {/* Current Editing Info */}
              {editingCategory && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-[15px] font-medium text-text-1 mb-2">
                    Currently Editing
                  </h3>
                  <p className="text-sm text-text-2">
                    Category Name:{" "}
                    <span className="text-text-1 font-medium">
                      {editingCategory?.name || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-text-3 mt-1">
                    Click "Update" to save changes or "Cancel" to discard
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Categories List */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-[14px] border border-border p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-text-1">
                  All Categories
                </h2>
                <SearchBar
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search categories..."
                />
              </div>

              {filteredCategories.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-text-3 mb-4">No categories found</div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-gold hover:text-gold/80"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <CategoryTable
                  categories={filteredCategories}
                  onEdit={startEdit}
                  onDelete={handleDeleteCategory}
                  editingCategoryId={editingCategory?._id}
                  isDeleting={isDeleting}
                  isUpdating={isUpdating}
                />
              )}

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-border text-sm text-text-3">
                Showing {filteredCategories.length} of {categories.length}{" "}
                categories
                {searchTerm && (
                  <span>
                    {" "}
                    for "<strong className="text-text-2">{searchTerm}</strong>"
                  </span>
                )}
                {editingCategory && (
                  <span className="ml-4 text-gold">
                    • Currently editing a category
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
