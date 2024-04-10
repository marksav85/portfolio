import { useState } from "react";
import { SingleProject } from "./SingleProject/SingleProject";
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
            Object.values(language.projects)
              .slice(0, 6) // Slice the array to get the first 6 objects
              .map((project, index) => {
                const projectNumber = index + 1; // Increment the index by 1 to start from 1
                return (
                  <SingleProject key={index} projectNumber={projectNumber} />
                );
              })}
        </div>

        <ul className="actions add-projects">
          <li>
            <button onClick={toggleVisibility} className="button">
              {language && language.work && language.work.Button}
            </button>
          </li>
        </ul>
        <div className="row">
          {isVisible &&
            language &&
            Object.values(language.projects)
              .slice(7, 11) // Slice the array to get the projects from index 7 to 11
              .map((project, index) => {
                const mainProjectNumber = 6; // Increment the index by 1 to start from 7
                const projectNumber = index + mainProjectNumber + 1; // Increment the index by 1
                return (
                  <SingleProject key={index} projectNumber={projectNumber} />
                );
              })}
        </div>
      </section>
    </>
  );
};
