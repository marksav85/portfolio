import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ImageCarousel } from "../image-carousel/image-carousel";

export const ImageModal = ({
  show,
  onHide,
  title,
  imageThumb1,
  imageThumb2,
  imageThumb3,
}) => {
  const containerStyle = {
    display: "block",
    width: "100px",
    margin: "0 auto", // Center the container horizontally
    border: "1px solid #ccc", // Example border for visualization
    padding: "20px",
  };
  return (
    <Modal show={show} onHide={onHide} centered keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImageCarousel
          imageThumb1={imageThumb1}
          imageThumb2={imageThumb2}
          imageThumb3={imageThumb3}
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
