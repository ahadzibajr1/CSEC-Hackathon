import React from "react";

import Root from "./Root";
import { StoreProvider } from "./LogIn/StoreContext";

function App() {
  return <StoreProvider><Root /></StoreProvider>;
}

export default App;