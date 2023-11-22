import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel({ firstImage, secondImage, thirdImage }) {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div className="carousel-image-container">
          <img
            src={firstImage}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
          />
        </div>

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img
            src={secondImage}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
          />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img
            src={thirdImage}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
          />
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
