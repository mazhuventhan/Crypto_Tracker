import { takeEvery, select } from "redux-saga/effects";
import { addToPortfolio, updateQuantity, removeFromPortfolio, clearPortfolio } from "../slices/portfolioSlice";
import type { RootState } from "../index";
function* savePortfolioToLocalStorage() {
  const portfolio: RootState['portfolio']['items'] = yield select(state => state.portfolio.items);
  localStorage.setItem("portfolio", JSON.stringify(portfolio));
}
export default function* portfolioSaga() {
  yield takeEvery([addToPortfolio.type, updateQuantity.type, removeFromPortfolio.type, clearPortfolio.type], savePortfolioToLocalStorage);
}
