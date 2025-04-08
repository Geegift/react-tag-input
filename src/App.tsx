import { useState } from "react";
import "./App.css";
import Page from "./page/Page";

function App() {
    const [selected, setSelected] = useState(["papaya"]);
    return (
       <Page />
    );
}

export default App;
