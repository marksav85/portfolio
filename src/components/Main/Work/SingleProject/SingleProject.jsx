/* eslint-disable react/prop-types */
import { useState } from "react";
import { ImageModal } from "../ImageModal/ImageModal";
import "bootstrap/dist/css/bootstrap.min.css";
// Import language-related context and custom hook
import { useLanguage } from "../../../../context/LanguageContext";
import useLanguageContent from "../../../../hooks/useLanguageContent";

export function SingleProject({ projectNumber }) {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  const imageStyle = {
    cursor: "pointer",
    outline: "0px",
  };
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [modalShow, setModalShow] = useState(false);

  const baseUrl = "http://localhost:1337";

  const imageUrl =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[0]?.attributes
      ?.url;
  // console.log(baseUrl + imageUrl);
  // console.log(projectNumber);

  return (
    <article className="col-6 col-12-xsmall work-item">
      <button
        onClick={() => setModalShow(true)}
        className="image fit thumb"
        style={imageStyle}
      >
        <img
          src={baseUrl + imageUrl}
          alt="cover image"
          className="carousel-fulls"
        ></img>
      </button>
      <ImageModal
        projectNumber={projectNumber}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="project-intro">
        <h2>{language?.projects?.[`Project${projectNumber}`]?.Title}</h2>

        <div className="project-intro-text">
          <p>{language?.projects?.[`Project${projectNumber}`]?.Intro}</p>
        </div>
      </div>
      <br />
      {isVisible && (
        <div className="project-description">
          <h4>{language?.labels?.Process}</h4>
          <p>{language?.projects?.[`Project${projectNumber}`]?.Text}</p>

          <br />
        </div>
      )}

      <button
        id="project-text-button"
        className="button"
        style={{ marginBottom: "20px" }}
        onClick={toggleVisibility}
      >
        {isVisible
          ? language?.labels?.buttonHide
          : language?.labels?.buttonShow}
      </button>

      <br />
      <div className="row">
        <div className="project-technologies">
          <p>
            {language?.labels?.Technologies}
            <span style={{ fontWeight: "bold" }}>
              {language?.projects?.[`Project${projectNumber}`]?.Technologies}
            </span>
          </p>
        </div>
        <div className="project-homepage">
          <p>
            {language?.labels?.Homepage}

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
        <div className="project-repository">
          <p>
            {language?.labels?.Repository}
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
}
