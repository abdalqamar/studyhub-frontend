// import { Save, X } from "lucide-react";

// const SectionForm = ({
//   register,
//   handleSubmit,
//   onSave,
//   onCancel,
//   errors,
//   isEditing = false,
//   loading,
// }) => {
//   return (
//     <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl border border-blue-500/50 overflow-hidden shadow-xl mb-6">
//       <div className="p-5">
//         <h3 className="text-white font-semibold mb-4 text-lg">
//           {isEditing ? "Edit Section" : "Create New Section"}
//         </h3>
//         <form onSubmit={handleSubmit(onSave)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-300 mb-2">
//               Section Name *
//             </label>
//             <input
//               {...register("sectionName", {
//                 required: "Section name is required",
//               })}
//               className="w-full bg-slate-700/50 border border-blue-500/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 text-sm sm:text-base rounded-lg px-4 py-3"
//               placeholder="Enter section title..."
//               autoFocus
//             />
//             {errors.sectionName && (
//               <p className="text-red-400 text-sm mt-1">
//                 {errors.sectionName.message}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               type="submit"
//               disabled={loading.createSection || loading.updateSection}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-white disabled:opacity-50 flex items-center gap-2"
//             >
//               <Save size={16} />
//               {isEditing ? "Update Section" : "Create Section"}
//             </button>
//             <button
//               type="button"
//               onClick={onCancel}
//               disabled={loading.createSection || loading.updateSection}
//               className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors font-medium text-white disabled:opacity-50 flex items-center gap-2"
//             >
//               <X size={16} />
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SectionForm;

import { Loader, Save, X } from "lucide-react";

const SectionForm = ({
  register,
  handleSubmit,
  onSave,
  onCancel,
  errors,
  isEditing = false,
  saving = false,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl border border-blue-500/50 overflow-hidden shadow-xl mb-6">
      <div className="p-5">
        <h3 className="text-white font-semibold mb-4 text-lg">
          {isEditing ? "Edit Section" : "Create New Section"}
        </h3>

        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Section Name *
            </label>

            <input
              {...register("sectionName", {
                required: "Section name is required",
              })}
              className="w-full bg-slate-700/50 border border-blue-500/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 text-sm sm:text-base rounded-lg px-4 py-3"
              placeholder="Enter section title..."
              autoFocus
            />

            {errors.sectionName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.sectionName.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-white disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              {isEditing ? "Update Section" : "Create Section"}

              {saving && <Loader className="w-5 h-5 animate-spin" />}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors font-medium text-white disabled:opacity-50 flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionForm;
