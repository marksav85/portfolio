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

  // Base URL for image URLs
  const baseUrl = "http://localhost:1337";

  // Construct URLs for project images
  const image1Url =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[0]?.attributes
      ?.url;
  const image2Url =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[1]?.attributes
      ?.url;
  const image3Url =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[2]?.attributes
      ?.url;

  // Complete URLs for project images
  const firstImage = baseUrl + image1Url;
  const secondImage = baseUrl + image2Url;
  const thirdImage = baseUrl + image3Url;

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
