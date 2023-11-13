import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel({ imageUrl }) {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={imageUrl} alt="Modal Image" className="img-fluid" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imageUrl} alt="Modal Image" className="img-fluid" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imageUrl} alt="Modal Image" className="img-fluid" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
