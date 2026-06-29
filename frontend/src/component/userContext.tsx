// context/UserContext.tsx

import { createContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";

// ✅ إضافة type للـ login response
type User = {
  id: number;
  email: string;
  username: string;
  fullname: string;
  roles: string[];
  avatar?: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message?: string;
  user?: User;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  authChecked: boolean; // ✅ تمييز بين تحميل الصفحة وفحص الجلسة
  loginLoading: boolean;  // ✅ تمييز بين تحميل الصفحة وتحمل تسجيل الدخول
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  refetchUser: () => Promise<void>; // ✅ إعادة جلب المستخدم
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // تحميل الصفحة
  const [loginLoading, setLoginLoading] = useState(false); // تحميل زر تسجيل الدخول
  const [authChecked, setAuthChecked] = useState(false);
  // ✅ استخدام useCallback لمنع إعادة إنشاء الدوال
  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        // 401 Unauthorized يعني ما في جلسة - عادي
        if (res.status === 401) {
          setUser(null);
        }
        throw new Error(`Failed to fetch user: ${res.status}`);
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      // ✅ التحقق من صحة البيانات
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, []);

  // Auto-restore session on page load
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  async function login(credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> {
    // ✅ Validation قبل الإرسال
    if (!credentials.email || !credentials.password) {
      return { success: false, message: "Email and password are required" };
    }

    if (!credentials.email.includes("@")) {
      return { success: false, message: "Please enter a valid email address" };
    }

    if (credentials.password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    setLoginLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password,
        }),
      });

      const data = await res.json() as LoginResponse;

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Login failed. Please check your credentials."
        };
      }

      // ✅ إذا رجع المستخدم من API login مباشرة
       if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true };
      }

      return { success: false, message: "User data missing from response." };

      } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error. Please try again."
      };
    } finally {
      setLoginLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Accept": "application/json" }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  }

  function hasRole(role: string): boolean {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  }

  const value: UserContextType = {
    user,
    loading,
    loginLoading,
    authChecked,
    login,
    logout,
    hasRole,
    refetchUser: fetchMe,
  };

  return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
  );
}

// Typed hook — always use this
export { UserContext };