import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Lang } from "./translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["es"];
}

const LangContext = createContext<LangContextType>({
  lang: "es",
  setLang: () => {},
  t: translations["es"],
});

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within <LangProvider>");
  }
  return ctx;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved && ["es", "en", "fr"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    window.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
