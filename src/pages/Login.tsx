import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e:any) => {
    e.preventDefault(); 
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("token", "crypto");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form 
        onSubmit={handleLogin} 
        autoComplete="off" 
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl text-gray-900 font-bold text-center mb-4">Crypto Tracker Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="off"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-500">
          Use <span className="font-medium">admin/admin123</span> to login
        </p>

        {showToast && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            Login Successful!
          </div>
        )}
      </form>
    </div>
  );
}
