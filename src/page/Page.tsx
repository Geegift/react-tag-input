import { TagField } from "../components/TagField";
import useTagInput from "../hook/useTag";

const Page = () => {
    const SEPARATORS = ["Enter"];
    const MAX_TAGS = 5;

    //Retrieve all the returned items from the hook
    const { tags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS); // pass the maximum tags

    return (
        <>
            <h1>Tag Input</h1>

            <TagField
                tags={tags}
                addTag={handleAddTag}
                removeTag={handleRemoveTag}
                maxTags={MAX_TAGS}
                separators={SEPARATORS}
            />
            <pre>{JSON.stringify(tags)}</pre>
        </>
    );
};

export default Page;
