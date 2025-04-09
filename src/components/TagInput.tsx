import React, { useState, KeyboardEvent, FocusEvent } from "react";

interface TagInputProps {
  separators?: string[];
  maxTags?: number;
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  initialTags?: string[];
}

const TagInput: React.FC<TagInputProps> = ({
  separators = [","],
  maxTags = Infinity,
  onChange,
  placeholder = "placeholder",
  initialTags = [],
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = (value: string) => {
    const escapedSeparators = separators.map((sep) => sep.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`[${escapedSeparators.join("")}]`);
    // const regex = new RegExp(`[${separators.join("")}]`);
    const newTags = value
      .split(regex)
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const updatedTags = [...tags];

    newTags.forEach((newTag) => {
      const existingIndex = updatedTags.indexOf(newTag);
      if (existingIndex !== -1) {
        // Add the dfuplicate tag next to the existing tag
        updatedTags.splice(existingIndex, 0, newTag);
      } else {
        updatedTags.push(newTag);
      }
    });

    if (maxTags && updatedTags.length > maxTags) {
      updatedTags.splice(0, updatedTags.length - maxTags);
    }

    setTags(updatedTags);
    onChange?.(updatedTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
        setInputValue("");
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onChange?.(updatedTags);
  };

  return (
    <div className="tag-input-container">
      {tags.map((tag, index) => (
        <div className="tag" key={index}>
          {tag}
          <button data-testid={`remove-button-${index}`} className="tag-remove" onClick={() => removeTag(index)}>
            &times;
          </button>
        </div>
      ))}
      {maxTags !== tags.length && (
        <input
          className="tag-input"
          type="text"
          value={inputValue}
          placeholder={tags.length === 0 ? placeholder : ""}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
};

export default TagInput;
