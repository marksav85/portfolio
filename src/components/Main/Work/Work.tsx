import { useState } from "react";
import { SingleProject } from "./SingleProject/SingleProject";
// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Work = () => {
  // Use language-related context and custom hook
  const language = useLanguageContent();

  // Toggle visibility of additional projects
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <section id="two">
        {/* Display work title */}
        <h2>{language?.work?.Title}</h2>
        <div className="row">
          {/* Map over projects and render each project */}
          {language?.projects &&
            Object.values(language.projects)
              .slice(0, 6) // Slice the array to get the first 6 objects
              .map((project, index) => {
                const projectNumber = index + 1; // Increment the index by 1 to start from 1
                return (
                  <SingleProject key={index} projectNumber={projectNumber} />
                );
              })}
        </div>

        {/* Button to toggle visibility of additional projects */}
        <ul className="actions add-projects">
          <li>
            <button onClick={toggleVisibility} className="button">
              {language?.work?.Button}
            </button>
          </li>
        </ul>
        <div className="row">
          {/* Render additional projects if isVisible is true */}
          {isVisible &&
            language?.projects &&
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
