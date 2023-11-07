import React from "react";
import PropTypes from "prop-types";

export function SingleProject({ title, description, image }) {
  const imageStyle = {
    cursor: "pointer",
    outline: "0px",
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
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

SingleProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
