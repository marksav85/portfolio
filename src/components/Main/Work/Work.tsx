import { useState } from "react";
import { SingleProject } from "./SingleProject/SingleProject";
// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";
import { projectPresentation, projectSource } from "../../../config/projects";
import { groupProjects } from "../../../api/projects";

export const Work: React.FC = () => {
  // State to manage visibility of additional projects
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility of additional projects
  const toggleVisibility: () => void = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  // Getting language content using custom hook
  const language = useLanguageContent();

  const { primary: primaryProjects, additional: additionalProjects } =
    groupProjects(language?.projects ?? [], projectPresentation);

  return (
    <>
      <section id="two" data-project-source={projectSource}>
        {/* Display work title */}
        <h2>{language?.work?.Title}</h2>
        <div className="row">
          {/* Map over projects and render each project */}
          {primaryProjects.map((project) => (
            <SingleProject
              key={project.slug}
              project={project}
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
                additionalProjects.map((project) => (
                  <SingleProject
                    key={project.slug}
                    project={project}
                  />
                ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};
