import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const BenefitsInput = ({
  register,
  setValue,
  watch,
  minItems = 3,
  maxItems = 5,
}) => {
  const whatYouWillLearn = watch("whatYouWillLearn") || [];

  const addBenefit = () => {
    const lastItem = whatYouWillLearn[whatYouWillLearn.length - 1];

    if (lastItem.trim() === "") {
      toast.error("Please fill the learning outcome before adding a new one");
      return;
    }
    if (whatYouWillLearn.length >= maxItems) {
      toast.error(`You can add only ${maxItems} learning outcomes`);
      return;
    }
    setValue("whatYouWillLearn", [...whatYouWillLearn, ""]);
  };

  const updateBenefit = (index, value) => {
    const updated = [...whatYouWillLearn];
    updated[index] = value;
    setValue("whatYouWillLearn", updated);
  };

  const removeBenefit = (index) => {
    if (whatYouWillLearn.length > minItems) {
      const updated = whatYouWillLearn.filter((_, i) => i !== index);
      setValue("whatYouWillLearn", updated);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block mb-2 font-medium text-slate-300">
        What You Will Learn *
        <span className="text-xs text-gray-500 ml-2">
          ({whatYouWillLearn.length}/{maxItems})
        </span>
      </label>

      {whatYouWillLearn.map((benefit, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div className="flex-1">
            <input
              {...register(`whatYouWillLearn.${index}`, {
                required:
                  index < minItems
                    ? "This learning outcome is required"
                    : false,
                minLength: {
                  value: 5,
                  message: "Learning outcome must be at least 5 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Learning outcome must be less than 200 characters",
                },
              })}
              value={benefit}
              onChange={(e) => updateBenefit(index, e.target.value)}
              placeholder={`What students will learn (e.g., Build real-world applications with React)`}
              className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
            />

            {whatYouWillLearn[index]?.length > 0 &&
              whatYouWillLearn[index]?.length < 5 && (
                <p className="text-red-400 text-xs mt-1">
                  Learning outcome must be at least 5 characters
                </p>
              )}
          </div>
          {whatYouWillLearn.length > minItems && (
            <button
              type="button"
              onClick={() => removeBenefit(index)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors text-sm flex-shrink-0"
              disabled={whatYouWillLearn.length <= minItems}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      ))}

      {whatYouWillLearn.length < maxItems && (
        <button
          type="button"
          onClick={addBenefit}
          className="flex  items-center gap-2 bg-gradient-to-br from-blue-600/70 to-blue-700/70 border border-blue-500/80
            text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 
            shadow-md hover:bg-blue-600 hover:border-blue-600 hover:shadow-xl"
        >
          <Plus size={18} />
          Add Learning Outcome
        </button>
      )}

      {whatYouWillLearn.length >= maxItems && (
        <p className="text-yellow-400 text-xs text-center">
          Maximum {maxItems} learning outcomes allowed
        </p>
      )}

      {whatYouWillLearn.length < minItems && (
        <p className="text-red-400 text-xs">
          Minimum {minItems} learning outcomes are required
        </p>
      )}
    </div>
  );
};
export default BenefitsInput;
