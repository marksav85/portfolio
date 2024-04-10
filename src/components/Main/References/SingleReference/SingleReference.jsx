import Carousel from "react-bootstrap/Carousel";
// Import language-related context and custom hook
import { useLanguage } from "../../../../context/LanguageContext";
import useLanguageContent from "../../../../hooks/useLanguageContent";

export default function SingleReference() {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();
  console.log(language?.referenceLists?.ReferenceList);
  const baseUrl = "http://localhost:1337";

  return (
    <>
      <Carousel indicators={false}>
        {language &&
          Object.values(language?.referenceLists?.ReferenceList).map(
            (reference, index) => (
              <Carousel.Item key={index} className="carousel-item">
                <div>
                  <blockquote>
                    &quot;
                    {reference.Quote[0].children[0].text}
                    &quot;
                  </blockquote>
                </div>
                <div>
                  <p>{reference.Text}</p>
                </div>
                <div className="reference-image-container">
                  <img
                    className="d-block img-fluid reference-image"
                    src={baseUrl + reference.Image.data.attributes.url}
                    alt={
                      baseUrl + reference.Image.data.attributes.alternativeText
                    }
                  />
                </div>
                <div className="reference-caption">
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
