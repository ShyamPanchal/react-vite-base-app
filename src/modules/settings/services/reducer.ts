import { SettingsActions } from "./actions";
import { UserProfile } from "./dataTypes";
import * as loginTypes from "./types";
import { persistReducer } from "redux-persist";
import * as storages from "redux-persist/lib/storage";
import { storageKeys } from "../../../utils/constants";

const storage = storages.default;

export type SettingsState = {
  accessToken?: string;
  userProfile?: UserProfile;

  sideNavOpen: boolean;

  loader: {
    login: boolean;
  };
};

const initialState: SettingsState = {
  sideNavOpen: true,

  loader: {
    login: false,
  },
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingsActions
): SettingsState => {
  switch (action.type) {
    case loginTypes.LOGIN_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          login: true,
        },
      };

    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        loader: {
          ...state.loader,
          login: false,
        },
      };

    case loginTypes.LOGIN_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          login: false,
        },
      };

    case loginTypes.USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        userProfile: action.result,
      };

    case loginTypes.USER_PROFILE_REQUESTED:
      return {
        ...state,
      };

    case loginTypes.SET_SIDE_NAV_OPEN:
      return {
        ...state,
        sideNavOpen: action.value,
      };

    default:
      return state;
  }
};

const config = {
  storage: storage,
  key: storageKeys.settings,
  whitelist: ["accessToken"],
};

export default persistReducer(config, settingsReducer);
