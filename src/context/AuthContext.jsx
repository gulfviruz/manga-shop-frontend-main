import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../services/authApi.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const profile = await getProfile(token);
        setUser(profile);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      const token = data.token || data.accessToken;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);

      const profile = await getProfile(token);
      setUser(profile);

      return profile;
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      const token = data.token || data.accessToken;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);

      const profile = await getProfile(token);
      setUser(profile);

      return profile;
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
