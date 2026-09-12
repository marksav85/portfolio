import { Modal } from "react-bootstrap";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import type { ImageAttributes } from "../../../../types/portfolio";

// TypeScript interfaces for ImageModal component
interface ImageModalProps {
  title: string | null | undefined;
  images: ImageAttributes[];
  show: boolean;
  onHide: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  title,
  images,
  show,
  onHide,
}) => {
  return (
    // Modal component to display project images
    <Modal show={show} onHide={onHide} centered id="modal-box">
      <Modal.Header closeButton>
        {/* Display project title in modal header */}
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* ImageCarousel component to display project images */}
        <ImageCarousel images={images} />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
