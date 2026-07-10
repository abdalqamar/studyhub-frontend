import { Plus, Trash2 } from "lucide-react";

const BenefitsInput = ({ setValue, watch, minItems = 3, maxItems = 5, errors }) => {
  const items = watch("whatYouWillLearn") || [];

  const addItem = () => {
    if (items.length >= maxItems) return;
    setValue("whatYouWillLearn", [...items, ""], { shouldValidate: true, shouldDirty: true });
  };

  const updateItem = (index, value) => {
    const next = [...items];
    next[index] = value;
    setValue("whatYouWillLearn", next, { shouldValidate: true, shouldDirty: true });
  };

  const removeItem = (index) => {
    if (items.length <= minItems) return;
    setValue(
      "whatYouWillLearn",
      items.filter((_, i) => i !== index),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <div className="space-y-3">
      <label className="block font-medium text-text-2 text-sm">
        What students will learn *{" "}
        <span className="font-mono text-xs text-text-3">{items.length}/{maxItems}</span>
      </label>

      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-1">
            <input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="e.g. Build real-world applications with React"
              className="w-full p-3 bg-surface-2 border border-border-strong rounded-lg focus:ring-3 focus:ring-gold/40 focus:border-gold outline-none transition-colors text-sm"
            />
            {errors?.whatYouWillLearn?.[index] && (
              <p className="text-danger text-xs mt-1">{errors.whatYouWillLearn[index].message}</p>
            )}
          </div>
          {items.length > minItems && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-3 text-danger border border-danger/30 rounded-lg hover:bg-danger-soft transition-colors flex-shrink-0"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 border border-gold/40 text-gold px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-soft transition-colors"
        >
          <Plus size={16} /> Add learning outcome
        </button>
      )}
    </div>
  );
};

export default BenefitsInput;
