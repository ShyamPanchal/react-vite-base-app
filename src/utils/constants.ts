import * as dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

export const storageKeys = {
  root: import.meta.env.TB_ROOT_KEY,
  settings: import.meta.env.TB_SETTINGS_KEY,
  operations: import.meta.env.TB_OPERATIONS_KEY,
};

dayjs.extend(LocalizedFormat);

export const DATE_TIME_FORMAT = "LLL";
export const DATE_FORMAT = "LL";
