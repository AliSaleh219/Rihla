// pages/LoginPage.tsx
import { useState } from "react";
import {useUser} from "../component/useUser.tsx";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login, loginLoading } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (result.success) {
      navigate("/");  // روح للصفحة الرئيسية
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Rihla</h1>

        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
            />
          </div>

          <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
  );
}