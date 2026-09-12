import Carousel from "react-bootstrap/Carousel";
// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";
import type { RichTextParagraph } from "../../../../types/portfolio";

const getFirstQuoteText = (
  quote: RichTextParagraph[] | null | undefined,
) => quote?.[0]?.children?.[0]?.text ?? "";

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
        {language?.referenceLists.ReferenceList.map((reference) => {
          const imageSource = reference.Image;

          return (
            <Carousel.Item key={reference.id} className="carousel-item">
              {/* Reference quote */}
              <div>
                <blockquote>
                  {/* Display reference quote */}
                  &quot;{getFirstQuoteText(reference.Quote)}&quot;
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
                {imageSource?.url && (
                  <img
                    className="d-block img-fluid reference-image"
                    src={imageSource.url}
                    alt={imageSource.alternativeText ?? ""}
                  />
                )}
              </div>
              {/* Reference caption */}
              <div className="reference-caption">
                {/* Display reference link */}
                {/* <a
                      href={reference.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reference.LinkText}
                </a> */}
                <p>{reference.LinkText}</p>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
