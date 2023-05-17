import { AnyAction, Dispatch, Middleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

import { configureStore } from "@reduxjs/toolkit";
import { NON_SERIALIZABLE as SETTINGS_NON_SERIALIZABLE } from "../modules/settings/services/actions";

const typesToExclude: string[] = [];

const dev =
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";

const sagaMiddleware = createSagaMiddleware();

const makeStore = (initialState = {}) => {
  const loggerMiddleware = createLogger({
    predicate: (getState: any, action: any) =>
      !typesToExclude.includes(action.type),
  });

  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];
  if (dev) {
    middlewares.push(loggerMiddleware);
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", ...SETTINGS_NON_SERIALIZABLE],
        },
      })
        .prepend(sagaMiddleware)
        .concat(...middlewares),
  });

  const persist = persistStore(store, undefined, () =>
    sagaMiddleware.run(rootSaga)
  );

  return { persist, store };
};

const appStore = makeStore();

export default appStore;
