import { useCategories } from "@/features/categories/hooks/useCategories";
import TagsInput from "./TagsInput";
import BenefitsInput from "./BenefitsInput";

const fieldClass =
  "w-full p-3 bg-surface-2 border border-border-strong rounded-lg focus:ring-3 focus:ring-gold/40 focus:border-gold outline-none transition-colors text-sm";

const CourseDetailsFields = ({ register, errors, setValue, watch }) => {
  const { data: categories = [] } = useCategories();

  return (
    <>
      <div>
        <label className="block mb-2 font-medium text-text-2 text-sm">
          Course name *
        </label>
        <input type="text" {...register("title")} className={fieldClass} />
        {errors.title && (
          <p className="text-danger text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium text-text-2 text-sm">
          Description *
        </label>
        <textarea
          rows="4"
          {...register("description")}
          className={fieldClass}
        />
        {errors.description && (
          <p className="text-danger text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-text-2 text-sm">
            Price (₹) *
          </label>
          <input type="number" {...register("price")} className={fieldClass} />
          {errors.price && (
            <p className="text-danger text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium text-text-2 text-sm">
            Category *
          </label>
          <select {...register("category")} className={fieldClass}>
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <TagsInput setValue={setValue} watch={watch} />
      {errors.tags && (
        <p className="text-danger text-sm -mt-2">{errors.tags.message}</p>
      )}

      <BenefitsInput setValue={setValue} watch={watch} errors={errors} />

      <div>
        <label className="block mb-2 font-medium text-text-2 text-sm">
          Requirements
        </label>
        <textarea
          rows="3"
          {...register("requirements")}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-text-2 text-sm">
          Instructions
        </label>
        <textarea
          rows="3"
          {...register("instructions")}
          className={fieldClass}
        />
      </div>
    </>
  );
};

export default CourseDetailsFields;
