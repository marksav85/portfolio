import React from "react";
import { Modal } from "react-bootstrap";
import { ImageCarousel } from "../image-carousel/image-carousel";

export const ImageModal = ({
  show,
  onHide,
  title,
  imageThumb1,
  imageThumb2,
  imageThumb3,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered keyboard={false} id="modal-box">
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
