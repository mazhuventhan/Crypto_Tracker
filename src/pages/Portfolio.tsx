import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromPortfolio } from "../store/slices/portfolioSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useState } from "react";

export default function Portfolio() {
  const { items } = useSelector((state: RootState) => state.portfolio);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const handleChange = (coinId: string, value: any) => {
    dispatch(updateQuantity({ coinId, quantity: value }));
    const coin = items.find(i => i.coinId === coinId);
    if (coin) {
      setToast(`Updated quantity for ${coin.name}`);
      setTimeout(() => setToast(null), 2000);
    }
  }
  const handleRemove = (coinId: string) => {
    const coin = items.find(i => i.coinId === coinId);
    dispatch(removeFromPortfolio(coinId));
    if (coin) {
      setToast(`${coin.name} removed from portfolio`);
      setTimeout(() => setToast(null), 2000);
    }
  }

  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.current_price, 0);

  return (
    <div className="p-6 min-h-screen bg-gray-100 relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Portfolio</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Dashboard
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        {items.length === 0 ? (
          <div className="text-gray-600 text-center py-20">No coins in portfolio.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left p-3 text-gray-800">Coin</th>
                  <th className="p-3 text-gray-800">Quantity</th>
                  <th className="p-3 text-gray-800">Price</th>
                  <th className="p-3 text-gray-800">Value</th>
                  <th className="p-3 text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.coinId} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 text-gray-800">{item.name}</td>
                    <td className="p-3 text-center">
                      <input
                        type="number" 
                        inputMode="numeric" 
                        pattern="[0-9]*" 
                        value={item.quantity}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(item.coinId, e.target.value)
  }

                        className="border rounded p-1 w-20 text-center text-black 
               [appearance:textfield] 
               [&::-webkit-outer-spin-button]:appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </td>

                    <td className="p-3 text-gray-800">${item.current_price.toLocaleString()}</td>
                    <td className="p-3 text-gray-800">${(item.quantity * item.current_price).toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item.coinId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 text-right font-bold text-gray-800">
          Total Portfolio Value: ${totalValue.toLocaleString()}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  );
}
