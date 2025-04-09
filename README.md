# How to use Tag input component

Allows users to enter and manage multiple tags.

## Props     |   Description                         |   Type                       |   Default
separators   |   value for customizable of separator |   string[]                   |   [","]
maxTags      |   limit the number of tags            |   number                     |   Infinity
onChange     |   onChange callback(added/removed)    |   (tags: string[]) => void;  |   
placeholder  |   placeholder for text input          |   string                     |   "placeholder"
initialTags  |   initial tags value                  |   string[]                   |   []

### Simple use
    <TagInput />

### Cutomize Example
    <TagInput maxTags={5} separators={["/","-"]} initialTags={["item1","item2"]} /> 
