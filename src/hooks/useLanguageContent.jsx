// Import necessary hooks from context and custom hook
import { useLanguage } from "../context/LanguageContext";
import { useGetLanguages } from "./useGetLanguages";

// Define a custom hook to use the selected language
const useLanguageContent = () => {
  // Destructure the selected language from the useLanguage hook
  const { selectedLanguage } = useLanguage();

  // Fetch language data using the useGetLanguages hook
  const { data } = useGetLanguages();

  // Switch statement to determine the language content based on the selected language
  switch (selectedLanguage) {
    case "german":
      return data && data[0].attributes.LanguageText; // German
    case "english":
      return data && data[1].attributes.LanguageText; // English
    default:
      return data && data[0].attributes.LanguageText; // Default to German if the language is not recognized
  }
};

// Export the custom hook
export default useLanguageContent;
