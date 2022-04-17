import React from "react";
import Main from "./components";
import { HackIdeasState } from "./context";

import "./app.less";

const App = () => {
  return (
    <HackIdeasState>
      <div className="app-container">
        <Main />
      </div>
    </HackIdeasState>
  );
};

export default App;
