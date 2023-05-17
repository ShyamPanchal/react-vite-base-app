import { UserProfile } from "./dataTypes";
import * as loginTypes from "./types";

//#region Login Requested
export type LoginRequestedAction = {
  type: typeof loginTypes.LOGIN_REQUESTED;
  username: string;
  password: string;
  failureCallback?: (error: string) => void;
};

export const requestLogin = (
  username: string,
  password: string,
  failureCallback?: (error: string) => void
): LoginRequestedAction => ({
  type: loginTypes.LOGIN_REQUESTED,
  username,
  password,
  failureCallback,
});
//#endregion

//#region Login Succeeded
export type LoginSuccessAction = {
  type: typeof loginTypes.LOGIN_SUCCESS;
  accessToken: string;
  refreshToken: string;
};

export const loginSuccess = (
  accessToken: string,
  refreshToken: string
): LoginSuccessAction => ({
  type: loginTypes.LOGIN_SUCCESS,
  accessToken,
  refreshToken,
});
//#endregion

//#region Login Failed
export type LoginFailedAction = {
  type: typeof loginTypes.LOGIN_FAILED;
  error: string;
};
//#endregion

//#region Logout Failed
export type LogoutFailedAction = {
  type: typeof loginTypes.LOGOUT_REQUESTED;
};

export const logout = () => ({ type: loginTypes.LOGOUT_REQUESTED });
//#endregion

//#region Get User profile Requested
export type UserProfileRequestedAction = {
  type: typeof loginTypes.USER_PROFILE_REQUESTED;
};
export const requestUserProfile = (): UserProfileRequestedAction => ({
  type: loginTypes.USER_PROFILE_REQUESTED,
});
//#endregion

//#region User profile action Succeeded
export type UserProfileSucceededAction = {
  type: typeof loginTypes.USER_PROFILE_SUCCEEDED;
  result: UserProfile;
};
export const userProfileSucceeded = (
  result: UserProfile
): UserProfileSucceededAction => ({
  type: loginTypes.USER_PROFILE_SUCCEEDED,
  result,
});
//#endregion

//#region Settings side nav change
export type SetSideNavOpenAction = {
  type: typeof loginTypes.SET_SIDE_NAV_OPEN;
  value: boolean;
};
export const setSideNavOpen = (value: boolean): SetSideNavOpenAction => ({
  type: loginTypes.SET_SIDE_NAV_OPEN,
  value,
});
//#endregion

export const NON_SERIALIZABLE = [loginTypes.LOGIN_REQUESTED];

export type SettingsActions =
  // Login
  | LoginRequestedAction
  | LoginSuccessAction
  | LoginFailedAction

  // Logout
  | LogoutFailedAction

  // User-profile
  | UserProfileRequestedAction
  | UserProfileSucceededAction

  // Settings
  | SetSideNavOpenAction;
