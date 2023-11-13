import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { UncontrolledExample } from "../image-carousel/image-carousel";

export const ImageModal = ({ show, onHide, imageUrl, title }) => {
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
        <UncontrolledExample />
        {/* <img src={imageUrl} alt="Modal Image" className="img-fluid" /> */}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
