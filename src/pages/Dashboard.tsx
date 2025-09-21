import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, setLoading } from "../store/slices/cryptoSlice";
import CoinCard from "../components/CoinCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { clearPortfolio } from "../store/slices/portfolioSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector((state: RootState) => state.crypto);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchCoins());
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(clearPortfolio());
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/login");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Crypto Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate("/portfolio")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Portfolio
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading ? <Loader /> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coins.map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>}
      {showToast && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow animate-fadeIn text-sm">
          Logged out successfully!
        </div>
      )}
    </div>
  );
}
