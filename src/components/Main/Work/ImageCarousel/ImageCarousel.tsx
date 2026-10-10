import Carousel from "react-bootstrap/Carousel";
import type { ImageAttributes } from "../../../../types/portfolio";

interface ImageCarouselProps {
  images: ImageAttributes[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ImageCarousel({ images, activeIndex, onSelect }: ImageCarouselProps) {
  if (!images.length) {
    return null;
  }

  return (
    // Bootstrap Carousel component to display project images
    <Carousel
      className="project-carousel"
      data-bs-theme="dark"
      controls={images.length > 1}
      indicators={images.length > 1}
      interval={null}
      activeIndex={activeIndex}
      onSelect={onSelect}
      slide={false}
      tabIndex={0}
      aria-label="Project images. Use left and right arrow keys to navigate."
    >
      {images.map((image, index) => {
        const hasDimensions =
          typeof image.width === "number" &&
          image.width > 0 &&
          typeof image.height === "number" &&
          image.height > 0;

        return (
          <Carousel.Item key={image.id ?? image.url}>
            <div className="carousel-image-container">
              <img
                src={image.url}
                alt={image.alternativeText ?? `Project image ${index + 1}`}
                className="img-fluid carousel-thumbs"
                width={hasDimensions ? (image.width ?? undefined) : undefined}
                height={hasDimensions ? (image.height ?? undefined) : undefined}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-image-actions">
              <span aria-live="polite">Image {index + 1} of {images.length}</span>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
