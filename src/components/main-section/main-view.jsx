import React from "react";
import { Profile } from "./profile-section/profile-section";
import { Work } from "./work-section/work-section";
import { Contact } from "./contact-section/contact-section";

export const MainView = ({ isEnglish }) => {
  return (
    <div id="main">
      <Profile isEnglish={isEnglish} />
      <Work isEnglish={isEnglish} />
      <Contact isEnglish={isEnglish} />
    </div>
  );
};
