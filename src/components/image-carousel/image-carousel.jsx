import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel({ imageThumb1, imageThumb2, imageThumb3 }) {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src={imageThumb1}
          alt="Modal Image"
          className="img-fluid carousel-thumbs"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={imageThumb2}
          alt="Modal Image"
          className="img-fluid carousel-thumbs"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={imageThumb3}
          alt="Modal Image"
          className="img-fluid carousel-thumbs"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
