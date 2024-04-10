import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel({ firstImage, secondImage, thirdImage }) {
  return (
    // Bootstrap Carousel component to display project images
    <Carousel data-bs-theme="dark">
      {/* First image */}
      <Carousel.Item>
        <div className="carousel-image-container">
          {/* Display first image */}
          <img
            src={firstImage}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
            loading="lazy"
          />
        </div>
        {/* Caption for first image */}
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>

      {/* Second image */}
      <Carousel.Item>
        <div className="carousel-image-container">
          {/* Display second image */}
          <img
            src={secondImage}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
            loading="lazy"
          />
        </div>
        {/* Caption for second image */}
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>

      {/* Third image */}
      <Carousel.Item>
        <div className="carousel-image-container">
          {/* Display third image */}
          <img
            src={thirdImage}
            alt="Modal Image"
            className="img-fluid carousel-thumbs"
            loading="lazy"
          />
        </div>
        {/* Caption for third image */}
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
