import { call, put, delay } from "redux-saga/effects";
import { fetchTopCoins } from "../../api/cryptoApi";
import { setCoins, setLoading, setError } from "../slices/cryptoSlice";
import type { Coin } from "../../types";

function* fetchCoinsSaga() {
  try {
    yield put(setLoading(true));
    const start = Date.now();
    const coins: Coin[] = yield call(fetchTopCoins);
    yield put(setCoins(coins));
    const elapsed = Date.now() - start;
    if (elapsed < 2000) {
      yield delay(2000 - elapsed);
    }
  } catch (err) {
    yield put(setError("Failed to fetch coins"));
  } finally {
    yield put(setLoading(false));
  }
}

function* pollCoinsSaga() {
  while (true) {
    yield call(fetchCoinsSaga);
    yield delay(60000);
  }
}
export default function* cryptoSaga() {
  yield call(pollCoinsSaga);
}
