import { usePortfolioContent } from "../context/PortfolioContentContext";

// Return the active locale's shared portfolio content.
const useLanguageContent = () => usePortfolioContent().data;

export default useLanguageContent;
