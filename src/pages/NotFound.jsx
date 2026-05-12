import { Link } from "react-router-dom";
import "../assets/css/profile.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="notfound">
        <h1 className="notfound__h1">404</h1>
        <p>Страница не найдена</p>
        <Link to="/">На главную</Link>
      </div>
    </div>
  );
}
