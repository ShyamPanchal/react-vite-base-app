import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import * as storages from "redux-persist/lib/storage";
import { LOGOUT_REQUESTED } from "../modules/settings/services/types";

/* Import your reducers here. */
import settingsReducer from "../modules/settings/services/reducer";
import operationsReducer from "../modules/operations/services/reducer";
import { storageKeys } from "../utils/constants";

const storage = storages.default;

const config = {
  storage: storage,
  key: storageKeys.root,
  whitelist: [],
};

const appReducer = combineReducers({
  settings: settingsReducer,
  operations: operationsReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT_REQUESTED) {
    state = undefined;
    /**
     * To not reset a reducer:
      const { topic } = state;
      state = { topic };
     */
    Object.values(storageKeys).forEach((key) =>
      storage.removeItem("persist:" + key)
    );
  }
  return appReducer(state, action);
};

export default persistReducer(config, rootReducer);
