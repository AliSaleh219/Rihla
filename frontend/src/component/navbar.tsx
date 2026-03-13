import {  Link, useLocation } from "react-router";
import { Compass, UserPlus , MapPin, Sparkles, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/trips", label: "Trips", icon: MapPin },
    { path: "/governorates", label: "Governorates", icon: MapPin },
    { path: "/recommendations", label: "Recommendations", icon: Sparkles },
    
  ];

  return (
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Compass className="w-8 h-8 text-[#2A6F97]" />
              <span className="text-xl font-semibold text-gray-900">Rihla</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-[#2A6F97] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <Link
                to="/login"
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#2A6F97] text-[#2A6F97] hover:bg-[#2A6F97] hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#2A6F97] text-[#2A6F97] hover:bg-[#2A6F97] hover:text-white transition-colors"
              >
                <UserPlus  className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "bg-[#2A6F97] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[#2A6F97] text-[#2A6F97]"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
  );
}