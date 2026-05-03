import { useState } from "react";
import { addUser } from "../component/api";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handlesubmit = () => {
    const userData = {
      fullname: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };
    addUser(userData);
    navigate("/login");
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
            Create account
          </p>
          <h1 className="text-2xl font-serif font-normal text-gray-900">
            Welcome <span className="italic text-blue-500">aboard.</span>
          </h1>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Jane Smith"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder-gray-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+963 000 000 000"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder-gray-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder-gray-300"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="@janesmith"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder-gray-300"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-300">
              Security
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Password */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder-gray-300"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-gray-500 mb-1">
                Confirm password  <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-gray-300"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={() => handlesubmit()}
            className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-99 text-white text-sm font-medium rounded-lg transition-all duration-150"
          >
            Create account
          </button>

          {/* Sign in link */}
          <p className="text-center mt-4 text-xs text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;