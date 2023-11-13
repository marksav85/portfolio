import Carousel from "react-bootstrap/Carousel";

export function UncontrolledExample() {
  const containerStyle = {
    width: "100px",
    margin: "0 auto", // Center the container horizontally
    border: "1px solid #ccc", // Example border for visualization
    padding: "20px",
  };

  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="/portfolio/public/images/fulls/project1.png"
          alt="Modal Image"
          style={{
            display: "block",
            width: "500px",
            margin: "0 auto", // Center the container horizontally
            border: "1px solid #ccc", // Example border for visualization
          }}
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/portfolio/public/images/fulls/project1.png"
          alt="Modal Image"
          className="img-fluid"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/portfolio/public/images/fulls/project1.png"
          alt="Modal Image"
          className="img-fluid"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
