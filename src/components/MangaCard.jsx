import { useNavigate } from "react-router-dom";
import "../assets/css/manga.css";

export default function MangaCard({ manga }) {
  const navigate = useNavigate();

  return (
    <div className="manga-card" onClick={() => navigate(`/manga/${manga._id}`)}>
      <img src={manga.image} alt={manga.title} className="manga-cover" />

      <div className="manga-info">
        <div className="manga-title">{manga.title}</div>

        <div className="manga-price">{manga.price} $</div>
      </div>
    </div>
  );
}
