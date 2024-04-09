// style
import Carousel from "react-bootstrap/Carousel";
import * as english from "../../../languages/en.json";
import * as german from "../../../languages/de.json";

export default function References({ isEnglish }) {
  const lang = isEnglish ? english : german;
  const refData = lang.referenceData;

  return (
    <section id="four">
      <h2>{lang.references.title}</h2>
      <Carousel indicators={false}>
        {refData.map((reference, index) => (
          <Carousel.Item key={index} className="carousel-item">
            <div>
              <blockquote>&quot;{reference.quote}&quot;</blockquote>
            </div>
            <div>
              <p>{reference.text}</p>
            </div>
            <div className="reference-image-container">
              <img
                className="d-block img-fluid reference-image"
                src={`images/refs/${reference.image}`}
                alt={`Reference ${index + 1}`}
              />
            </div>
            <div className="reference-caption">
              <a
                href={reference.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {reference.linkText}
              </a>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
