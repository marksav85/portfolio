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
      return (
        data && {
          header: data.header.data.attributes.localizations.data[0].attributes,
          profile:
            data.profile.data.attributes.localizations.data[0].attributes,
          skillsTables: data.skillsTables.data,
        }
      ); // German
    case "english":
      return (
        data && {
          header: data.header.data.attributes,
          profile: data.profile.data.attributes,
          skillsTables: data.skillsTables.data,
        }
      ); // English
    default:
      return (
        data && {
          header: data.header.data.attributes,
          profile: data.profile.data.attributes,
          skillsTables: data.skillsTables.data,
        }
      ); // Default to German if the language is not recognized
  }
};

// Export the custom hook
export default useLanguageContent;
