import { useState } from "react";
import { SingleProject } from "./SingleProject/SingleProject";
import AdditionalProjects from "./AdditionalProjects/AdditionalProjects";
// Import language-related context and custom hook
import { useLanguage } from "../../../context/LanguageContext";
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Work = () => {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  console.log(language);

  return (
    <>
      <section id="two">
        <h2>{language && language.work && language.work.Title}</h2>
        <div className="row">
          {language &&
            Object.values(language.projects).map((workItem, index) => (
              <SingleProject key={index} />
            ))}
        </div>

        <ul className="actions add-projects">
          <li>
            <button onClick={toggleVisibility} className="button">
              {language && language.work && language.work.Button}
            </button>
          </li>
        </ul>
        {isVisible && <AdditionalProjects />}
      </section>
    </>
  );
};
