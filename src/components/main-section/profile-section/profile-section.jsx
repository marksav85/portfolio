import React from "react";
import * as english from "../../../languages/en.json";
import * as german from "../../../languages/de.json";
import { About } from "./about-section/about-section";

export const Profile = ({ isEnglish }) => {
  const lang = isEnglish ? english : german;

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <section id="one">
        <header className="major">
          <h2>{lang.profileSection.line1}</h2>
        </header>
        <p>{lang.profileSection.line2}</p>
        <ul className="actions">
          <li>
            <button onClick={toggleVisibility} className="button">
              {isVisible ? lang.toggleSkills.hide : lang.toggleSkills.show}
            </button>
          </li>
        </ul>
        {isVisible && <About isEnglish={isEnglish} />}
      </section>
    </>
  );
};
