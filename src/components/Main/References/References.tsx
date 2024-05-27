// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";
import SingleReference from "./SingleReference/SingleReference";

export default function References() {
  // Use language-related context and custom hook
  const language = useLanguageContent();

  return (
    <section id="four">
      {/* Display the title from the language context */}
      <h2>{language?.reference?.Title}</h2>
      {/* Render the SingleReference component */}
      <SingleReference />
    </section>
  );
}
