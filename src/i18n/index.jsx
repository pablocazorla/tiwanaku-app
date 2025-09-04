import { useContext } from "react";
import AppContext from "@/context";
import es from "./es.json";
import en from "./en.json";

const languages = {
  es,
  en,
};

const getI18n = (lang, id) => {
  return languages[lang][id] || id;
};

const I18n = ({ id }) => {
  const { lang } = useContext(AppContext);

  return <>{getI18n(lang, id)}</>;
};
export default I18n;
