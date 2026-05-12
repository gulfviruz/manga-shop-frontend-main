import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";

import "../assets/css/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = e => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/catalog?search=${search}`);
      closeMenu();
    }
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Manga<span>Shop</span>
        </Link>

        <button
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/catalog" onClick={closeMenu}>
            Каталог
          </Link>

          {user ? (
            <>
              <Link to="/cart" className="cart-link" onClick={closeMenu}>
                Корзина
                <span className="cart-count">
                  {(cart || []).reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </Link>
              <Link to="/profile" onClick={closeMenu}>
                Профиль
              </Link>

              <button
                className="btn-logout"
                onClick={() => {
                  logout();
                  closeMenu();
                  navigate("/");
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Войти
            </Link>
          )}

          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Сменить тему">
            <img src={darkMode ? sunIcon : moonIcon} alt="theme icon" width="24" height="24" />
          </button>
        </div>
      </div>
    </nav>
  );
}
