import { useState } from "react";
import { SingleProject } from "./SingleProject/SingleProject";
// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

// TypeScript interface for additional projects section
interface toggleVisibility {
  initialVisibility?: boolean; // Initial visibility of the Additonal projects section
}

export const Work: React.FC<toggleVisibility> = ({
  initialVisibility = false,
}) => {
  // State to manage visibility of additional projects
  const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

  // Function to toggle visibility of additional projects
  const toggleVisibility: () => void = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  // Getting language content using custom hook
  const language = useLanguageContent();

  const projectKeys =
    language?.projects
      ? Object.keys(language.projects).filter((key) =>
          key.toLowerCase().startsWith("project")
        )
      : [];

  const renderProject = (key: string, index: number) => {
    const projectNumber = parseInt(key.replace("Project", ""), 10);

    if (Number.isNaN(projectNumber)) {
      return null;
    }

    return (
      <SingleProject key={`${key}-${index}`} projectNumber={projectNumber} />
    );
  };

  const primaryProjects = projectKeys.slice(0, 6);
  const additionalProjects = projectKeys.slice(6);

  return (
    <>
      <section id="two">
        {/* Display work title */}
        <h2>{language?.work?.Title}</h2>
        <div className="row">
          {/* Map over projects and render each project */}
          {primaryProjects.map(renderProject)}
        </div>

        {additionalProjects.length > 0 && (
          <>
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
              {isVisible && additionalProjects.map(renderProject)}
            </div>
          </>
        )}
      </section>
    </>
  );
};
