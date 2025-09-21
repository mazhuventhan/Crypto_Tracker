import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coin } from "../../types";

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  coins: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    fetchCoins: () => { },
    setCoins: (state, action: PayloadAction<Coin[]>) => { state.coins = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; },
  },
});

export const { fetchCoins, setCoins, setLoading, setError } = cryptoSlice.actions;
export default cryptoSlice.reducer;
