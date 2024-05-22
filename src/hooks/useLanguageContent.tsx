// Import necessary hooks from context and custom hook
import { useLanguage } from "../context/LanguageContext";
import { useGetLanguages } from "./useGetLanguages";

// Define a custom hook to use the selected language
const useLanguageContent = () => {
  // Destructure the selected language from the useLanguage hook
  const { selectedLanguage } = useLanguage();

  // Fetch language data using the useGetLanguages hook
  const { data } = useGetLanguages();

  // Check if the data is available
  if (!data) {
    return null;
  }

  // Utility function to safely access localizations
  const getLocalizationAttributes = (localizations: any) =>
    localizations?.data?.[0]?.attributes || {};

  // Switch statement to determine the language content based on the selected language
  switch (selectedLanguage) {
    case "german":
      return {
        header: getLocalizationAttributes(
          data.header.data.attributes.localizations
        ),
        profile: getLocalizationAttributes(
          data.profile.data.attributes.localizations
        ),
        skillsTables: data.skillsTables.data,
        work: getLocalizationAttributes(
          data.work.data.attributes.localizations
        ),
        labels: getLocalizationAttributes(
          data.labels.data[0].attributes.localizations
        ),
        projects: getLocalizationAttributes(
          data.projects.data[0].attributes.localizations
        ),
        contact: getLocalizationAttributes(
          data.contact.data.attributes.localizations
        ),
        reference: getLocalizationAttributes(
          data.reference.data.attributes.localizations
        ),
        referenceLists: getLocalizationAttributes(
          data.referenceLists.data[0].attributes.localizations
        ),
      }; // German
    case "english":
      return (
        data && {
          header: data.header.data.attributes,
          profile: data.profile.data.attributes,
          skillsTables: data.skillsTables.data,
          work: data.work.data.attributes,
          labels: data.labels.data[0].attributes,
          projects: data.projects.data[0].attributes,
          contact: data.contact.data.attributes,
          reference: data.reference.data.attributes,
          referenceLists: data.referenceLists.data[0].attributes,
        }
      ); // English
    default:
      return (
        data && {
          header: data.header.data.attributes,
          profile: data.profile.data.attributes,
          skillsTables: data.skillsTables.data,
          work: data.work.data.attributes,
          labels: data.labels.data[0].attributes,
          projects: data.projects.data[0].attributes,
          contact: data.contact.data.attributes,
          reference: data.reference.data.attributes,
          referenceLists: data.referenceLists.data[0].attributes,
        }
      ); // Default to German if the language is not recognized
  }
};

// Export the custom hook
export default useLanguageContent;
