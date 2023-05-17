import { SETT_KEYS } from "../../modules/settings/languages/keys";

export type KEYS = SETT_KEYS;

export type Translation = {
  [key in KEYS]?: string;
};
