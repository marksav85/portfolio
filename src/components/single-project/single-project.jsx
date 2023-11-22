/* eslint-disable react/prop-types */
import React from "react";
import { ImageModal } from "../image-modal/image-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

export function SingleProject({
  title,
  image1,
  image2,
  image3,
  projectData,
  projectLabels,
  links,
  isEnglish,
}) {
  const lang = isEnglish ? english : german;
  const imageStyle = {
    cursor: "pointer",
    outline: "0px",
  };
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [modalShow, setModalShow] = React.useState(false);

  const firstImage = `images/project-images/${image1}`;
  const secondImage = `images/project-images/${image2}`;
  const thirdImage = `images/project-images/${image3}`;

  return (
    <article className="col-6 col-12-xsmall work-item">
      <button
        onClick={() => setModalShow(true)}
        className="image fit thumb"
        style={imageStyle}
      >
        <img src={firstImage} alt={title} className="carousel-fulls"></img>
      </button>
      <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        firstImage={firstImage}
        secondImage={secondImage}
        thirdImage={thirdImage}
        title={title}
      />
      <div className="project-intro">
        <h2>{title}</h2>
        <h4>{projectLabels.introTitle}</h4>
        <p>{projectData.introText}</p>
      </div>
      <br />
      {isVisible && (
        <div>
          <h4>{projectLabels.processTitle}</h4>
          <p>{projectData.para1}</p>
          <br />
          <p>{projectData.para2}</p>
          <br />
          <p>{projectData.para3}</p>

          <br />
        </div>
      )}

      <button
        onClick={toggleVisibility}
        className="button"
        style={{ marginBottom: "20px" }}
      >
        {isVisible ? lang.toggleWork.hide : lang.toggleWork.show}
      </button>

      <br />
      <div className="row">
        <p>
          {projectLabels.technologies}
          <span style={{ fontWeight: "bold" }}>{projectData.technologies}</span>
        </p>
        <p>
          {projectLabels.site}
          <a href={links.site}>{title}</a>
        </p>
        <p>
          {projectLabels.repo}
          <a href={links.repo}>GitHub {title}</a>
        </p>
      </div>
    </article>
  );
}
