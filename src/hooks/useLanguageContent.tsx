import { useGetLanguages } from "./useGetLanguages";

// Return the active locale's shared portfolio content.
const useLanguageContent = () => useGetLanguages().data;

export default useLanguageContent;
