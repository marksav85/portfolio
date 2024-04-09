import { useState } from "react";
import * as english from "../../../languages/en.json";
import * as german from "../../../languages/de.json";
import { About } from "./About/About";

// Import language-related context and custom hook
import { useLanguage } from "../../../context/LanguageContext";
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Profile = ({ isEnglish }) => {
  const lang = isEnglish ? english : german;

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  return (
    <>
      <section id="one">
        <header className="major">
          <h2>{language && language.profile && language.profile.Title}</h2>
        </header>
        <p>{language && language.profile && language.profile.Text}</p>
        <ul className="actions">
          <li>
            <button onClick={toggleVisibility} className="button">
              {isVisible
                ? language && language.profile && language.profile.buttonHide
                : language && language.profile && language.profile.buttonShow}
            </button>
          </li>
        </ul>
        {isVisible && <About isEnglish={isEnglish} />}
      </section>
    </>
  );
};
