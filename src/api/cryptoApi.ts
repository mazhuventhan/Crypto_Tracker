import axios from "axios";
import type { Coin } from "../types";

export const fetchTopCoins = async (): Promise<Coin[]> => {
  const response = await axios.get<Coin[]>(
    "https://api.coingecko.com/api/v3/coins/markets",
    { params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10, page: 1 } }
  );
  return response.data;
};
