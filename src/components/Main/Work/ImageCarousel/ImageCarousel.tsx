import Carousel from "react-bootstrap/Carousel";
import type { ImageAttributes } from "../../../../types/portfolio";

interface ImageCarouselProps {
  images: ImageAttributes[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  if (!images.length) {
    return null;
  }

  return (
    // Bootstrap Carousel component to display project images
    <Carousel data-bs-theme="dark" controls={false}>
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
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
