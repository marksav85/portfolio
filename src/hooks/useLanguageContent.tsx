import { useGetLanguages } from "./useGetLanguages";

// The query selects the active locale and adapts Strapi's response envelopes.
const useLanguageContent = () => useGetLanguages().data;

export default useLanguageContent;
