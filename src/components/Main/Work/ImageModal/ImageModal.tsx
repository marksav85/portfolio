import { Modal } from "react-bootstrap";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";

// TypeScript interfaces for ImageModal component
interface ImageModalProps {
  projectNumber: number;
  show: boolean;
  onHide: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  projectNumber,
  show,
  onHide,
}) => {
  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();

  // Base URL for resume links
  // const { baseUrl } = useLanguage();

  const imageSet = language?.projects?.[`Project${projectNumber}`]?.Images;
  const normalizedImages = Array.isArray(imageSet)
    ? imageSet
    : imageSet
    ? [imageSet]
    : [];

  const firstImage = normalizedImages[0]?.url ?? "";
  const secondImage = normalizedImages[1]?.url ?? "";
  const thirdImage = normalizedImages[2]?.url ?? "";

  return (
    // Modal component to display project images
    <Modal show={show} onHide={onHide} centered keyboard={false} id="modal-box">
      <Modal.Header closeButton>
        {/* Display project title in modal header */}
        <Modal.Title>
          {language?.projects?.[`Project${projectNumber}`]?.Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* ImageCarousel component to display project images */}
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
