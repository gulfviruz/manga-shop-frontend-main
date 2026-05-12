import { Link } from 'react-router-dom';
import '../assets/css/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3> Manga Shop</h3>
          <p>Лучшая манга по лучшим ценам</p>
          <p>© {currentYear} Все права защищены</p>
        </div>

        <div className="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/profile">Профиль</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Помощь</h4>
          <ul>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Соцсети</h4>
          <ul className="social-links">
            <li><a href="#"> Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#"> Twitter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}