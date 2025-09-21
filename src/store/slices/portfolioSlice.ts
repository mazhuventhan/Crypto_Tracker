import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PortfolioItem } from "../../types";

interface PortfolioState {
  items: PortfolioItem[];
}

const initialState: PortfolioState = {
  items: JSON.parse(localStorage.getItem("portfolio") || "[]"),
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addToPortfolio: (state, action: PayloadAction<PortfolioItem>) => {
      state.items.push(action.payload);
      localStorage.setItem("portfolio", JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ coinId: string; quantity: number }>) => {
      const item = state.items.find(i => i.coinId === action.payload.coinId);
      if (item) { item.quantity = action.payload.quantity; item.value = item.quantity * item.current_price; }
      localStorage.setItem("portfolio", JSON.stringify(state.items));
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.coinId !== action.payload);
      localStorage.setItem("portfolio", JSON.stringify(state.items));
    },
    clearPortfolio: (state) => {
      state.items = [];
      localStorage.removeItem("portfolio");
    },
  },
});

export const { addToPortfolio, updateQuantity, removeFromPortfolio,clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
