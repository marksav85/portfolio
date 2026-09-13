import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";
import type { RichTextParagraph } from "../../../../types/portfolio";

const getFirstQuoteText = (quote: RichTextParagraph[] | null | undefined) =>
  quote?.[0]?.children?.[0]?.text ?? "";

export default function SingleReference() {
  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
      stopOnFocusIn: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  ).current;
  const emblaOptions = useMemo(() => ({ loop: true }), []);
  const emblaPlugins = useMemo(
    () => (prefersReducedMotion ? [] : [autoplay]),
    [autoplay, prefersReducedMotion],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, emblaPlugins);
  const stopAutoplay = useCallback(() => autoplay.stop(), [autoplay]);
  const scrollPrevious = useCallback(
    () => {
      stopAutoplay();
      emblaApi?.scrollPrev();
    },
    [emblaApi, stopAutoplay],
  );
  const scrollNext = useCallback(() => {
    stopAutoplay();
    emblaApi?.scrollNext();
  }, [emblaApi, stopAutoplay]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <div className="references-carousel">
      <div className="references-carousel__viewport" ref={emblaRef}>
        <div className="references-carousel__container">
        {language?.referenceLists.ReferenceList.map((reference) => {
          const imageSource = reference.Image;
          const hasImageDimensions =
            typeof imageSource?.width === "number" &&
            imageSource.width > 0 &&
            typeof imageSource.height === "number" &&
            imageSource.height > 0;

          return (
            <div
              key={reference.id}
              className="references-carousel__slide"
            >
              <div className="reference-content">
                {/* Reference quote */}
                <div>
                  <blockquote>
                    {/* Display reference quote */}
                    &quot;{getFirstQuoteText(reference.Quote)}&quot;
                  </blockquote>
                </div>
                {/* Reference text */}
                <div className="reference-text">
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
                      width={
                        hasImageDimensions
                          ? (imageSource.width ?? undefined)
                          : undefined
                      }
                      height={
                        hasImageDimensions
                          ? (imageSource.height ?? undefined)
                          : undefined
                      }
                      loading="lazy"
                      decoding="async"
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
              </div>
            </div>
          );
        })}
        </div>
      </div>

      <button
        type="button"
        className="references-carousel__button references-carousel__button--previous"
        aria-label="Show previous reference"
        onClick={scrollPrevious}
        onFocus={stopAutoplay}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className="references-carousel__button references-carousel__button--next"
        aria-label="Show next reference"
        onClick={scrollNext}
        onFocus={stopAutoplay}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
