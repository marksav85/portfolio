// Import language-related context and custom hook
import { useLanguage } from "../../../context/LanguageContext";
import useLanguageContent from "../../../hooks/useLanguageContent";
import SingleReference from "./SingleReference/SingleReference";

export default function References() {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  return (
    <section id="four">
      <h2>{language?.reference?.Title}</h2>
      <SingleReference />
    </section>
  );
}
