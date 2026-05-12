import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://manga-shop-backend.onrender.com/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data.items);
      // console.log(cart);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async productId => {
    await axios.post(
      "https://manga-shop-backend.onrender.com/cart/add",
      { productId, quantity: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchCart();
  };

  const removeFromCart = async productId => {
    await axios.delete(`https://manga-shop-backend.onrender.com/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await fetchCart();
  };

  const clearCart = async () => {
    await axios.delete("https://manga-shop-backend.onrender.com/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await fetchCart();
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.patch(
        `https://manga-shop-backend.onrender.com/cart/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};
