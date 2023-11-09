import React from "react";
import PropTypes from "prop-types";

export function SingleProject({ title, description, image }) {
  const imageStyle = {
    cursor: "pointer",
    outline: "0px",
  };
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <article className="col-6 col-12-xsmall work-item">
      <a
        href={`/portfolio/images/fulls/${image}`}
        className="image fit thumb"
        style={imageStyle}
      >
        <img src={`/portfolio/images/thumbs/${image}`} alt={title}></img>
      </a>
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
