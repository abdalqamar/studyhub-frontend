import { useState } from "react";

const SUGGESTED = ["React", "JavaScript", "Web development", "Programming", "Frontend"];

const TagsInput = ({ setValue, watch, maxItems = 5 }) => {
  const tags = watch("tags") || [];
  const [inputValue, setInputValue] = useState("");

  const addTag = (raw) => {
    const tag = raw.trim();
    if (tag && tags.length < maxItems && !tags.includes(tag)) {
      setValue("tags", [...tags, tag], { shouldValidate: true, shouldDirty: true });
      setInputValue("");
    }
  };

  const removeTag = (index) =>
    setValue("tags", tags.filter((_, i) => i !== index), { shouldValidate: true, shouldDirty: true });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) addTag(inputValue);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-medium text-text-2 text-sm">
        Tags * <span className="font-mono text-xs text-text-3">{tags.length}/{maxItems}</span>
      </label>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => inputValue.trim() && addTag(inputValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press enter"
        className="w-full p-3 bg-surface-2 border border-border-strong rounded-lg focus:ring-3 focus:ring-gold/40 focus:border-gold outline-none transition-colors text-sm"
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className="bg-gold-soft border border-gold-dim text-gold px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button type="button" onClick={() => removeTag(index)} className="hover:text-danger">
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {SUGGESTED.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => addTag(tag)}
            disabled={tags.length >= maxItems || tags.includes(tag)}
            className="border border-border-strong text-text-2 px-3 py-1 rounded-full text-xs hover:border-gold hover:text-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
