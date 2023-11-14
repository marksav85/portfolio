import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel({ imageThumb1, imageThumb2, imageThumb3 }) {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div className="carousel-image-container">
          <img
            src={imageThumb1}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
          />
        </div>

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img
            src={imageThumb2}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
          />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img
            src={imageThumb3}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
          />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
