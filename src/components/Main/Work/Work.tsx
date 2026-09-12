import { useState } from "react";
import { SingleProject } from "./SingleProject/SingleProject";
// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";
import type { ProjectSet } from "../../../types/portfolio";

const projectKeyPattern = /^Project(\d+)$/;

const getProjectNumbers = (projects: ProjectSet | null | undefined) => {
  if (!projects) {
    return [];
  }

  return Object.keys(projects)
    .flatMap((key) => {
      const match = projectKeyPattern.exec(key);
      const projectNumber = match ? Number(match[1]) : NaN;

      return Number.isSafeInteger(projectNumber) && projects[`Project${projectNumber}`]
        ? [projectNumber]
        : [];
    })
    .sort((first, second) => first - second);
};

export const Work: React.FC = () => {
  // State to manage visibility of additional projects
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility of additional projects
  const toggleVisibility: () => void = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  // Getting language content using custom hook
  const language = useLanguageContent();

  const projectNumbers = getProjectNumbers(language?.projects);
  const primaryProjects = projectNumbers.slice(0, 6);
  const additionalProjects = projectNumbers.slice(6);

  return (
    <>
      <section id="two">
        {/* Display work title */}
        <h2>{language?.work?.Title}</h2>
        <div className="row">
          {/* Map over projects and render each project */}
          {primaryProjects.map((projectNumber) => (
            <SingleProject
              key={`Project${projectNumber}`}
              projectNumber={projectNumber}
            />
          ))}
        </div>

        {additionalProjects.length > 0 && (
          <>
            {/* Button to toggle visibility of additional projects */}
            <ul className="actions add-projects">
              <li>
                <button
                  onClick={toggleVisibility}
                  className="button"
                  aria-expanded={isVisible}
                >
                  {language?.work?.Button}
                </button>
              </li>
            </ul>
            <div className="row">
              {/* Render additional projects if isVisible is true */}
              {isVisible &&
                additionalProjects.map((projectNumber) => (
                  <SingleProject
                    key={`Project${projectNumber}`}
                    projectNumber={projectNumber}
                  />
                ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};
