import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import * as storages from "redux-persist/lib/storage";
import { storageKeys } from "../../../utils/constants";
import ppmReducer from "../PPM/services/reducer";
const storage = storages.default;

const config = {
  storage: storage,
  key: storageKeys.operations,
  whitelist: [],
};

const operationsReducer = combineReducers({
  ppm: ppmReducer,
});

export default persistReducer(config, operationsReducer);
