import { Modal } from "react-bootstrap";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
// Import language-related context and custom hook
import { useLanguage } from "../../../../context/LanguageContext";
import useLanguageContent from "../../../../hooks/useLanguageContent";

export const ImageModal = ({ projectNumber, show, onHide }) => {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  const baseUrl = "http://localhost:1337";
  const image1Url =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[0]?.attributes
      ?.url;
  const image2Url =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[1]?.attributes
      ?.url;
  const image3Url =
    language?.projects?.[`Project${projectNumber}`]?.Images?.data[2]?.attributes
      ?.url;

  const firstImage = baseUrl + image1Url;
  const secondImage = baseUrl + image2Url;
  const thirdImage = baseUrl + image3Url;

  return (
    <Modal show={show} onHide={onHide} centered keyboard={false} id="modal-box">
      <Modal.Header closeButton>
        <Modal.Title>
          {language?.projects?.[`Project${projectNumber}`]?.Title}
        </Modal.Title>
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
