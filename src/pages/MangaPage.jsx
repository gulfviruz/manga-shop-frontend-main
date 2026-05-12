import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMangaById } from "../services/mangaApi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

import "../assets/css/manga.css";

export default function MangaPage() {
  const { id } = useParams();

  const [manga, setManga] = useState(null);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useAuth();

  const { addToCart } = useCart();

  const { addToFavorites } = useFavorites();

  useEffect(() => {
    fetchMangaById(id).then(data => {
      setManga(data);
      setLoading(false);
    });
  }, [id]);

  const handleBuy = () => {
    if (!user) {
      alert("Войдите, чтобы мангу в корзину");

      return;
    }

    setModalOpen(true);
  };

  const handleFavorites = () => {
    if (!user) {
      alert("Войдите, чтобы добавить мангу в избранное");

      return;
    }

    addToFavorites({
      id: manga._id,
      title: manga.title,
      price: manga.price,
      image: manga.image,
    });
    alert("Добавлено в избранное");
  };

  const confirmPurchase = () => {
    addToCart(manga._id);

    setModalOpen(false);

    alert("Манга добавлена в корзину!");
  };

  if (loading) {
    return <Loader />;
  }

  if (!manga) {
    return <div className="container">Манга не найдена</div>;
  }

  return (
    <div className="manga-container">
      <div className="detail-page">
        <div className="detail-cover">
          <img src={manga.image} alt={manga.title} />
        </div>

        <div className="detail-info">
          <h1>{manga.title}</h1>

          <p>
            <strong>Автор: </strong>
            {manga.authors?.join(", ")}
          </p>

          <p>
            <strong>Главы: </strong>
            {manga.chapters || "?"}
          </p>

          <p>
            <strong>Томов: </strong>
            {manga.volumes || "?"}
          </p>

          <p>
            <strong>Статус: </strong>
            {manga.status || "Неизвестно"}
          </p>

          <p>
            <strong>Цена: </strong>
            <span className="manga-price">{manga.price} $</span>
          </p>
          <div className="btn-container">
            <button onClick={handleBuy} className="buy-btn">
              Добавить в корзину
            </button>
            <button onClick={handleFavorites} className="fav-btn">
              В избранное
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title="Подтверждение"
        message={`Вы хотите добавить в корзину "${manga.title}" за ${manga.price}$?`}
        onConfirm={confirmPurchase}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
