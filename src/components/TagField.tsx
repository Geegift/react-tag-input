import { ChangeEvent, useState } from "react";

interface tagInterface {
    tags: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    maxTags?: number;
    placeholder?: string;
    separators?: string[];
}

export const TagField = ({
    tags,
    addTag,
    removeTag,
    maxTags = Infinity,
    placeholder = "placeholder",
    separators = [","],
}: tagInterface) => {

    const [userInput, setUserInput] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("e.key : ", e.key, separators);

        if (separators.includes(e.key)) {
            e.preventDefault(); // Prevent form submission or new line creation

            if (userInput.trim() !== "" && tags.length < maxTags) {
                addTag(userInput);
                setUserInput(""); // Clear the input after adding a tag
            }
        }
    };

    const handleOnBlur = () => {
        console.log("handleOnBlur : ", userInput);
        if (userInput.trim() !== "" && tags.length < maxTags) {
            addTag(userInput);
            setUserInput(""); // Clear the input after adding a tag
        }
    };

    return (
        <div className="flex flex-col w-[300px] md:w-[400px]">
            <input
                name="keyword_tags"
                type="text"
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                onKeyDown={handleKeyPress}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
                value={userInput}
                disabled={tags.length === maxTags}
            />

            {/* ===== Render the tags here ===== */}

            <div className="flex flex-row flex-wrap gap-3 mt-4">
                {tags.map((tag: string, index: number) => (
                    <span
                        key={`${index}-${tag}`}
                        className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
                    >
                        {tag}
                        <button
                            className="ml-2 hover:text-blue-500"
                            onClick={() => removeTag(tag)}
                            title={`Remove ${tag}`}
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};
