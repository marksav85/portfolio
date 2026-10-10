import { Modal } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../../context/LanguageContext";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedLanguage } = useLanguage();
  const originalImage = images[activeIndex] ?? images[0];
  const originalLabel = selectedLanguage === "german"
    ? "Originalbild in einem neuen Tab öffnen"
    : "Open original image in a new tab";

  return (
    // Modal component to display project images
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="project-image-dialog"
      className="project-image-modal"
      aria-label={`${title ?? "Project"} image viewer`}
      onExited={() => setActiveIndex(0)}
    >
      <Modal.Header closeButton>
        {/* Display project title in modal header */}
        <Modal.Title>
          {title}
        </Modal.Title>
        {originalImage && (
          <a
            className="project-image-original"
            href={originalImage.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={originalLabel}
            title={originalLabel}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
          </a>
        )}
      </Modal.Header>
      <Modal.Body>
        {/* ImageCarousel component to display project images */}
        <ImageCarousel images={images} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </Modal.Body>
    </Modal>
  );
};
