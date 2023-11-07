import { useState } from "react";
import React from "react";
import { Header } from "./components/header-section/header-section";
import { MainView } from "./components/main-view/main-view";

function App() {
  return (
    <div>
      <Header />
      <MainView />
    </div>
  );
}

export default App;
