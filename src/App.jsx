import { useState } from "react";
import React from "react";
import { Header } from "./components/Header/Header";
import { MainView } from "./components/Main/MainView";
import { Footer } from "./components/Main/Footer/Footer";

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
