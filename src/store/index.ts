import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import cryptoReducer from "./slices/cryptoSlice";
import portfolioReducer from "./slices/portfolioSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    portfolio: portfolioReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
