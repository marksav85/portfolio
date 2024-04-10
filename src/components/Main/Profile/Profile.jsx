import { useState } from "react";
import { About } from "./About/About";

// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Use language-related context and custom hook
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
        {isVisible && <About />}
      </section>
    </>
  );
};
