import { useContext } from "react";
import AppContext from "@/context";
import es from "./es.json";
import en from "./en.json";

export const languagesList = [
  { id: "en", name: "English" },
  { id: "es", name: "Español" },
];

export const DEFAULT_LANG = "en";

const languages = {
  es,
  en,
};

const getI18n = (lang, id) => {
  return languages[lang][id] || id;
};

const I18n = ({ id }) => {
  const { options } = useContext(AppContext);

  return <>{getI18n(options.lang, id)}</>;
};
export default I18n;
