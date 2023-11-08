import { useState } from "react";
import React from "react";
import { Header } from "./components/header-section/header-section";
import { MainView } from "./components/main-view/main-view";
import { Footer } from "./components/footer-section/footer-section";

function App() {
  return (
    <div>
      <Header />
      <MainView />
      <Footer />
    </div>
  );
}

export default App;
