import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchPortfolioContent } from "../api/strapi";
import type { LanguageContent, PortfolioLocale } from "../types/portfolio";
import { useLanguage } from "./LanguageContext";

interface PortfolioContentContextValue {
  data: LanguageContent | null;
  loading: boolean;
  error: Error | null;
}

const PortfolioContentContext = createContext<
  PortfolioContentContextValue | undefined
>(undefined);

const localeByLanguage: Record<string, PortfolioLocale> = {
  german: "de",
  english: "en",
};

interface PortfolioContentProviderProps {
  children: ReactNode;
}

export const usePortfolioContent = (): PortfolioContentContextValue => {
  const context = useContext(PortfolioContentContext);

  if (!context) {
    throw new Error(
      "usePortfolioContent must be used within a PortfolioContentProvider",
    );
  }

  return context;
};

export const PortfolioContentProvider: React.FC<
  PortfolioContentProviderProps
> = ({ children }) => {
  const { selectedLanguage } = useLanguage();
  const locale = localeByLanguage[selectedLanguage] ?? "en";
  const [data, setData] = useState<LanguageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Partial<Record<PortfolioLocale, LanguageContent>>>(
    {},
  );

  useEffect(() => {
    const controller = new AbortController();
    const cachedContent = cacheRef.current[locale];

    if (cachedContent) {
      setData(cachedContent);
      setLoading(false);
      setError(null);

      return () => controller.abort();
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const content = await fetchPortfolioContent(locale);

        if (!controller.signal.aborted) {
          cacheRef.current[locale] = content;
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

  return (
    <PortfolioContentContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContentContext.Provider>
  );
};
