import Carousel from "react-bootstrap/Carousel";
// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";

export default function SingleReference() {
  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();

  // Base URL for reference image URLs
  // const { baseUrl } = useLanguage();

  return (
    <>
      {/* Carousel to display reference items */}
      <Carousel indicators={false}>
        {/* Map over reference list items and render each reference */}
        {language &&
          Object.values(language?.referenceLists?.ReferenceList).map(
            (reference: any, index: number) => (
              <Carousel.Item key={index} className="carousel-item">
                {/* Reference quote */}
                <div>
                  <blockquote>
                    {/* Display reference quote */}
                    &quot;{reference.Quote[0].children[0].text}&quot;
                  </blockquote>
                </div>
                {/* Reference text */}
                <div>
                  {/* Display reference text */}
                  <p>{reference.Text}</p>
                </div>
                {/* Reference image */}
                <div className="reference-image-container">
                  {/* Display reference image */}
                  <img
                    className="d-block img-fluid reference-image"
                    src={reference.Image.data.attributes.url}
                    alt={reference.Image.data.attributes.alternativeText}
                  />
                </div>
                {/* Reference caption */}
                <div className="reference-caption">
                  {/* Display reference link */}
                  <a
                    href={reference.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {reference.LinkText}
                  </a>
                </div>
              </Carousel.Item>
            )
          )}
      </Carousel>
    </>
  );
}
