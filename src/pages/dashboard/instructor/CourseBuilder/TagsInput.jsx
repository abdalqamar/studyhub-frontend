import React, { useState } from "react";

const TagsInput = ({ register, setValue, watch, maxItems = 5 }) => {
  const tags = watch("tags") || [];

  const [inputValue, setInputValue] = useState("");

  const addTag = (newTag) => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && tags.length < maxItems && !tags.includes(trimmedTag)) {
      const updatedTags = [...tags, trimmedTag];
      setValue("tags", updatedTags);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setValue("tags", updatedTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = (e) => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tags *
        <span className="text-xs text-gray-500 ml-2">
          ({tags.length}/{maxItems})
        </span>
      </label>

      {/* Main Input for typing tags */}
      <input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder="Enter tags separated by commas (e.g., React, JavaScript, Web Development)"
        className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
      />

      {/* Hidden input for react-hook-form registration */}
      <input
        type="hidden"
        {...register("tags", {
          validate: {
            minTags: (value) =>
              value.length >= 1 || "At least one tag is required",
            maxTags: (value) =>
              value.length <= maxItems || `Maximum ${maxItems} tags allowed`,
          },
        })}
      />

      {/* Display tags as chips */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-white hover:text-red-200 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/*  for common tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {[
          "React",
          "JavaScript",
          "Web Development",
          "Programming",
          "Frontend",
        ].map((suggestedTag) => (
          <button
            type="button"
            key={suggestedTag}
            onClick={() => addTag(suggestedTag)}
            disabled={tags.length >= maxItems || tags.includes(suggestedTag)}
            className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/40 text-white px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 shadow-sm

      hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg
      disabled:opacity-60 disabled:bg-slate-700 disabled:text-slate-400 
      disabled:border-slate-600 disabled:cursor-not-allowed"
          >
            + {suggestedTag}
          </button>
        ))}
      </div>

      {/* Validation messages */}
      {tags.length >= maxItems && (
        <p className="text-yellow-400 text-xs text-center">
          Maximum {maxItems} tags allowed. Remove some to add more.
        </p>
      )}

      <div className="text-xs text-gray-500 mt-2">
        <p>• Type tags and press Enter or comma to add</p>
        <p>• Click on suggested tags to add them quickly</p>
        <p>• Click × to remove a tag</p>
      </div>
    </div>
  );
};

export default TagsInput;
