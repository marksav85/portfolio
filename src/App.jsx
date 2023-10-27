import { useState } from "react";
import React from "react";
import { Header } from "./components/header-section/header-section";
import { Profile } from "./components/profile-section/profile-section";
import { Work } from "./components/work-section/work-section";
import { Contact } from "./components/contact-section/contact-section";

function App() {
  return (
    <div>
      <Header />
      <Profile />
      <Work />
      <Contact />
    </div>
  );
}

export default App;
