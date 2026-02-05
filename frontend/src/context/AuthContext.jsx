import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAppNavigation } from "../hooks/useAppNavigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { goHome, goLogin } = useAppNavigation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // persistent user across refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");

    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // Register
  const register = async ({ name, email, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password is too short");
      return;
    }

    try {
      const res = await api.post("/users/register", {
        username: name,
        email,
        password,
      });

      const userData = res.data.user;

      setUser(userData);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      goHome();
      return userData;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Server is unreachable. Try again later",
      );
      console.error("Registration failed:", error);
    }
  };

  // Login
  const login = async ({ email, password }) => {
    try {
      const res = await api.post(`/users/login`, { email, password });
      const userData = res.data.user;

      setUser(userData);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      goHome();
      return userData;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Server is unreachable. Try again later",
      );
      console.error(error);
    }
  };

  // logout
  const logOut = async () => {
    try {
      await api.post("/users/logout");

      setUser(null);
      localStorage.removeItem("userInfo");

      goLogin();
    } catch (err) {
      toast.error("Failed to logout. try again later");
      console.error("Logout failed:", err);
    }
  };

  // update user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logOut,
        loading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
