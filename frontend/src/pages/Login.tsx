import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../component/api";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlesubmit = () => {
    const credentials = {
      email: formData.email,
      password: formData.password,
    };
    loginUser(credentials)
      .then((data) => {
        alert("Login successful!");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Failed to login. Please check your credentials and try again.");
      });
      navigate("/");
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
            Welcome back
          </p>
          <h1 className="text-2xl font-serif font-normal text-gray-900">
            Sign <span className="italic text-blue-500">in.</span>
          </h1>
        </div>
        {/* Body */}
        <div className="px-8 py-7">
          <div className="mb-4">
            <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-gray-300"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-gray-300"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            onClick={()=>handlesubmit()}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-99 text-white text-sm font-medium rounded-lg transition-all duration-150 mt-4"
          >
            Sign in
          </button>
          <p className="text-center mt-4 text-xs text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 font-medium hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;