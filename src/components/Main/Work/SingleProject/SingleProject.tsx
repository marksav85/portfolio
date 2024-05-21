/* eslint-disable react/prop-types */
import { useState } from "react";
import { ImageModal } from "../ImageModal/ImageModal";
import "bootstrap/dist/css/bootstrap.min.css";
// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";

// Define the props interface
interface SingleProjectProps {
  initialVisibility?: boolean;
  projectNumber: number;
  paragraphs?: Paragraph[]; // Optional prop for paragraphs
}

interface ParagraphChild {
  type: string;
  text: string;
}

interface Paragraph {
  children: ParagraphChild[];
}

export const SingleProject: React.FC<SingleProjectProps> = ({
  initialVisibility = false,
  projectNumber,
}) => {
  // State to manage visibility of additional projects
  const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

  // Function to toggle visibility of additional projects
  const toggleVisibility: () => void = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();

  // Style for the project image
  const imageStyle = {
    cursor: "pointer", // Set cursor style to pointer
    outline: "0px", // Remove outline on focus
  };

  // State to manage visibility of image modal
  const [modalShow, setModalShow] = useState(false);

  // Base URL for image URLs
  const baseUrl = "http://localhost:1337";

  // Construct URL for the project image
  const imageUrl =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[0]?.attributes
      ?.url;

  return (
    <article className="col-6 col-12-xsmall work-item">
      {/* Button to show image modal */}
      <button
        onClick={() => setModalShow(true)}
        className="image fit thumb"
        style={imageStyle}
      >
        {/* Display project image */}
        <img
          src={baseUrl + imageUrl}
          alt="cover image"
          className="carousel-fulls"
        ></img>
      </button>

      {/* Modal for displaying project images */}
      <ImageModal
        projectNumber={projectNumber}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div className="project-intro">
        {/* Display project title */}
        <h2>{language?.projects?.[`Project${projectNumber}`]?.Title}</h2>

        <div className="project-intro-text">
          {/* Display project introduction */}
          <p>{language?.projects?.[`Project${projectNumber}`]?.Intro}</p>
        </div>
      </div>
      <br />

      {/* Display project description if isVisible is true */}
      {isVisible && (
        <div className="project-description">
          <h4>{language?.labels?.Process}</h4>
          {/* Display project description text */}
          {language?.projects?.[`Project${projectNumber}`]?.TextBlock?.map(
            // TextBlock is an array of paragraphs
            (paragraph: Paragraph, index: number) =>
              // Check if paragraph has children and type is 'text'
              paragraph.children && paragraph.children[0]?.type === "text" ? (
                // Render the text content
                <div key={index}>
                  <p>{paragraph.children[0].text}</p>
                  <br />
                </div>
              ) : null
          )}

          <br />
        </div>
      )}

      {/* Button to toggle visibility of project description */}
      <button
        id="project-text-button"
        className="button"
        style={{ marginBottom: "20px" }}
        onClick={toggleVisibility}
      >
        {/* Display button text based on visibility state */}
        {isVisible
          ? language?.labels?.buttonHide // Text to show/hide project description
          : language?.labels?.buttonShow}{" "}
      </button>

      <br />

      {/* Display project details */}
      <div className="row">
        {/* Display project technologies */}
        <div className="project-technologies">
          <p>
            {language?.labels?.Technologies}
            <span style={{ fontWeight: "bold" }}>
              {language?.projects?.[`Project${projectNumber}`]?.Technologies}
            </span>
          </p>
        </div>

        {/* Display project homepage */}
        <div className="project-homepage">
          <p>
            {language?.labels?.Homepage}
            {/* Display project homepage link or text */}
            {language?.projects?.[`Project${projectNumber}`]?.hasHomepage ===
            false ? (
              <span>
                {language?.projects?.[`Project${projectNumber}`]?.Homepage}
              </span>
            ) : (
              <a
                href={language?.projects?.[`Project${projectNumber}`]?.Homepage}
              >
                {language?.projects?.[`Project${projectNumber}`]?.Title}
              </a>
            )}
          </p>
        </div>

        {/* Display project repository */}
        <div className="project-repository">
          <p>
            {language?.labels?.Repository}
            {/* Display project repository link */}
            <a
              href={language?.projects?.[`Project${projectNumber}`]?.Repository}
            >
              {language?.projects?.[`Project${projectNumber}`]?.Title}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
};
