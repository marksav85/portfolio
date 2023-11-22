import React from "react";
import { Modal } from "react-bootstrap";
import { ImageCarousel } from "../image-carousel/image-carousel";

export const ImageModal = ({
  show,
  onHide,
  title,
  firstImage,
  secondImage,
  thirdImage,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered keyboard={false} id="modal-box">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImageCarousel
          firstImage={firstImage}
          secondImage={secondImage}
          thirdImage={thirdImage}
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
