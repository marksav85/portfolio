import React from "react";
import PropTypes from "prop-types";
import { ImageModal } from "../image-modal/image-modal";
import "bootstrap/dist/css/bootstrap.min.css";

export function SingleProject({ title, description, image }) {
  const imageStyle = {
    cursor: "pointer",
    outline: "0px",
  };
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [modalShow, setModalShow] = React.useState(false);
  const imageUrl = "/portfolio/images/thumbs/project1.png";

  return (
    <article className="col-6 col-12-xsmall work-item">
      <button
        onClick={() => setModalShow(true)}
        className="image fit thumb"
        style={imageStyle}
      >
        <img src={`/portfolio/images/thumbs/${image}`} alt={title}></img>
      </button>
      <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        imageUrl={imageUrl}
        title={title}
      />

      <h2>{title}</h2>
      <h4>{description.introTitle}</h4>
      <p>{description.introText}</p>
      <br />
      {isVisible && (
        <div>
          <h4>{description.processTitle}</h4>
          <p>{description.para1}</p>
          <br />
          <p>{description.para2}</p>
          <br />
          <p>{description.para3}</p>
          <br />
        </div>
      )}

      <button onClick={toggleVisibility} className="button">
        {isVisible ? "Hide Build Process" : "Show Build Process"}
      </button>
    </article>
  );
}

SingleProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
