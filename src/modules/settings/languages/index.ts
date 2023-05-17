import { Languages, LOCALES } from "../../../utils/languages";
import English from "../languages/english";
import German from "../languages/german";

export const languages: Languages = {
  [LOCALES.ENGLISH]: English,
  [LOCALES.GERMAN]: German,
};
