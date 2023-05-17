import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  LoginRequestedAction,
  loginSuccess,
  LoginSuccessAction,
  userProfileSucceeded,
  UserProfileSucceededAction,
} from "./actions";
import { getUserProfilesAPI, loginAPI } from "./api";
import { LoginResponse, UserProfile } from "./dataTypes";
import { selectAccessToken } from "./selectors";
import * as userTypes from "./types";

function* performLogin(action: LoginRequestedAction) {
  try {
    console.log("login requested", action);
    const response: LoginResponse | null = yield call(
      loginAPI,
      action.username,
      action.password
    );

    if (response === null) {
      yield put({ type: userTypes.LOGIN_FAILED, error: "reponse is null" });
    } else {
      const next: LoginSuccessAction = yield call(
        loginSuccess,
        response?.access,
        response?.refresh
      );
      yield put(next);
    }
  } catch (error: any) {
    if (action.failureCallback) {
      let message = "Could not perform login. Check credentials.";
      if (error?.detail) {
        message = error.detail;
      }
      yield call(action.failureCallback, message);
    }
    yield put({ type: userTypes.LOGIN_FAILED, error: error.toString() });
  }
}

function* handleGetUserProfile() {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }

    const result: UserProfile | null = yield call(
      getUserProfilesAPI,
      accessToken
    );

    if (result === null) {
      throw new Error("API Call Failed.");
    } else {
      const next: UserProfileSucceededAction = yield call(
        userProfileSucceeded,
        result
      );
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: userTypes.USER_PROFILE_FAILED,
      error: error.toString(),
    });
  }
}

function* settingsSaga() {
  yield takeEvery(userTypes.LOGIN_REQUESTED, performLogin);
  yield takeEvery(userTypes.USER_PROFILE_REQUESTED, handleGetUserProfile);
}

export default settingsSaga;
