const fieldClass =
  "w-full bg-surface-2 border border-border-strong rounded-lg px-4 py-2.5 text-sm text-text-1 focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/30";

const LessonFormFields = ({ register, errors, disabled }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-text-2 mb-2">Lecture title *</label>
      <input {...register("title")} className={fieldClass} placeholder="Enter lecture title" disabled={disabled} />
      {errors.title && <p className="text-danger text-sm mt-1">{errors.title.message}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-text-2 mb-2">Description *</label>
      <textarea
        {...register("description")}
        rows={3}
        className={fieldClass}
        placeholder="Enter lesson description"
        disabled={disabled}
      />
      {errors.description && <p className="text-danger text-sm mt-1">{errors.description.message}</p>}
    </div>
  </>
);

export default LessonFormFields;
