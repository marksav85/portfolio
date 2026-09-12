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
      {images.map((image, index) => (
        <Carousel.Item key={image.id ?? image.url}>
          <div className="carousel-image-container">
            <img
              src={image.url}
              alt={image.alternativeText ?? `Project image ${index + 1}`}
              className="img-fluid carousel-thumbs"
              loading="lazy"
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
