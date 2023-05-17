import { useState } from "react";
import { KEYS } from "../languages/keys";
import { Languages, LOCALES } from "../languages";

const useTranslation = (languages: Languages) => {
  const [currentLocale, setCurrentLocale] = useState(LOCALES.ENGLISH);

  const localize = (key: KEYS) => {
    const translations = languages[currentLocale];
    return translations[key]
      ? translations[key]
      : languages[LOCALES.ENGLISH][key];
  };

  return { currentLocale, localize, setCurrentLocale };
};

export default useTranslation;
