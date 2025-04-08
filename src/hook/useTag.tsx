import { useState } from "react";

const useTagInput = (maxTags: number) => {
    // Keep track of the tags array.
    const [tags, setTags] = useState<string[]>([]);

    // Function to handle adding the tag to the array
    const handleAddTag = (tag: string) => {
        const newTag = tag.trim();
        if (newTag === "") return;
        const limit = maxTags ?? Infinity;
        const normalizedTag = newTag.toLowerCase();
        const index = tags.findIndex(t => t.toLowerCase() === normalizedTag);
        let newTags = [...tags];
      
        if (index !== -1) {
          // Move tag to right next to its existing version
          newTags.splice(index, 1);         // remove
          newTags.splice(index + 1, 0, newTag); // re-insert next to original
        } else {
          if (newTags.length < limit) {
            newTags.push(newTag);
          }
        }
      setTags([...tags, newTag]);
    };

    // Function to remove tag from array
    const handleRemoveTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

    // Return tags and functions from the hook
    return { tags, handleAddTag, handleRemoveTag };
};

export default useTagInput;
