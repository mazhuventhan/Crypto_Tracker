import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToPortfolio } from "../store/slices/portfolioSlice";
import type { Coin } from "../types";
interface Props { coin: Coin; }

export default function CoinCard({ coin }: Props) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const handleAdd = () => {
    dispatch(addToPortfolio({
      coinId: coin.id,
      name: coin.name,
      quantity: 1,
      current_price: coin.current_price,
      value: coin.current_price
    }));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <div className="bg-gray-100 border p-4 rounded shadow flex items-center justify-between relative">
      <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex flex-col text-right md:text-left md:flex-1">
        <div className="font-bold text-gray-800">{coin.name} ({coin.symbol.toUpperCase()})</div>
        <div className="text-gray-700">${coin.current_price.toLocaleString()}</div>
        <div className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-start md:items-end mt-2 md:mt-0 ml-4">
          <div className="text-gray-700 text-sm">Market Cap: ${coin.market_cap.toLocaleString()}</div>
          <button
            onClick={handleAdd}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition"
          >
            Add
          </button>
        </div>
      </div>
      {showToast && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow animate-fadeIn text-sm">
          {coin.name} added!
        </div>
      )}
    </div>
  );
}
