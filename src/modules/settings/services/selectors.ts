import { AppState } from "../../../services/appState";

export const selectAccessToken = (state: AppState) => state.settings.accessToken;
export const selectUserProfile = (state: AppState) => state.settings.userProfile;

export const selectLoaders = (state: AppState) => state.settings.loader;

export const selectSideNavOpen = (state: AppState) => state.settings.sideNavOpen;