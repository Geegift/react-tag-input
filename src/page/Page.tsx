import TagInput from "../components/TagInput";

const Page = () => {
  const SEPARATORS = ["/", "*"];
  const MAX_TAGS = 5;
  const INIT_TAGS = ["item1", "item2"];

  return (
    <>
      <div className="App-header">Tag Input Component</div>
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div className="container">
          <p> Simple tag input :</p>
          <TagInput />
        </div>
      </div>
      <div className="card">
        <div className="container">
          <p>
            Custom tag input : Dynamic separator character {JSON.stringify(SEPARATORS)} and set limit tags (
            {MAX_TAGS} tags)
          </p>
          <TagInput maxTags={MAX_TAGS} separators={SEPARATORS} />
        </div>
      </div>
    </>
  );
};

export default Page;
