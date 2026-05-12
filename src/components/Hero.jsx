import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../assets/css/hero.css";

export default function Hero() {
  const { darkMode } = useTheme();

  return (
    <section className={`hero ${darkMode ? "dark" : "light"}`}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          Добро пожаловать в <span>MangaShop</span>
        </h1>
        <p className="hero-subtitle">
          Лучшая манга по лучшим ценам — окунись в мир японских комиксов
        </p>
        <Link to="/catalog" className="hero-cta">
          В каталог
        </Link>
      </div>
      <div className="hero-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
