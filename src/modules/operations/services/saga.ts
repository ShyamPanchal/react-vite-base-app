import { all, fork } from "redux-saga/effects";
import ppmSaga from "../PPM/services/saga";

export default function* operationsSaga() {
  yield all([fork(ppmSaga)]);
}
