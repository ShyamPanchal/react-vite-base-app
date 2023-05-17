import { Translation } from "./keys";

export enum LOCALES {
  ENGLISH,
  GERMAN,
}

export type Languages = {
  [key in LOCALES]: Translation;
};
