import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { fetchPortfolioContent } from "../api/strapi";
import type { LanguageContent, PortfolioLocale } from "../types/portfolio";

export const useGetLanguages = () => {
  const { selectedLanguage } = useLanguage();

  const locale: PortfolioLocale = selectedLanguage === "german" ? "de" : "en";

  const [data, setData] = useState<LanguageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const content = await fetchPortfolioContent(locale);

        if (!controller.signal.aborted) {
          setData(content);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load portfolio content"),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => controller.abort();
  }, [locale]);

  return {
    data,
    loading,
    error,
  };
};
