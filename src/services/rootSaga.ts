import { all, fork } from "redux-saga/effects";
import loginSaga from "../modules/settings/services/saga";
import operationsSaga from "../modules/operations/services/saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(operationsSaga)
  ]);
}
