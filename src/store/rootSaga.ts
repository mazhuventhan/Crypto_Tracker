import { all } from "redux-saga/effects";
import cryptoSaga from "./sagas/cryptoSaga";
import portfolioSaga from "./sagas/portfolioSaga";

export default function* rootSaga() {
  yield all([cryptoSaga(), portfolioSaga()]);
}
