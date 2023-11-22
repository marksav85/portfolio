import { useState } from "react";
import React from "react";
import { Header } from "./components/header-section/header-section";
import { MainView } from "./components/main-section/main-view";
import { Footer } from "./components/main-section/footer-section/footer-section";

function App() {
  const [isEnglish, setIsEnglish] = React.useState(true);
  const handleLanguageChange = () => {
    setIsEnglish(!isEnglish);
  };
  return (
    <div>
      <Header isEnglish={isEnglish} setLanguage={handleLanguageChange} />
      <MainView isEnglish={isEnglish} />
      <Footer />
    </div>
  );
}

export default App;
