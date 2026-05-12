import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import Loader from "../components/Loader";
import "../assets/css/profile.css";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();

  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get("https://manga-shop-backend.onrender.com/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setOrders(res.data);
      } catch (error) {
        console.log("Orders error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (authLoading) {
    return <Loader />;
  }

  // если не авторизован
  if (!user) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>Профиль</h1>
        <p>
          <b>Имя:</b>&nbsp;{user.name}
        </p>
        <p>
          <b>Email: </b>&nbsp;{user.email}
        </p>
      </div>

      <div className="profile-favorites">
        <h2>Избранное ({favorites.length})</h2>

        {favorites.length === 0 ? (
          <p className="prof-favorites_title">Пока ничего нет</p>
        ) : (
          <>
            {favorites.map(item => (
              <div key={item.id} className="favorite-card">
                <div className="favorite-info">
                  <div className="favorite-title">{item.title}</div>

                  <div className="favorite-price">{item.price}$</div>
                </div>

                <div className="fav-btn-container">
                  <button onClick={() => navigate(`/manga/${item.id}`)} className="favorite-btn">
                    Посмотреть
                  </button>
                  <button onClick={() => removeFromFavorites(item.id)} className="remove-btn">
                    Удалить
                  </button>
                </div>
              </div>
            ))}

            <button onClick={clearFavorites} className="favclear-btn">
              Очистить избранное
            </button>
          </>
        )}
      </div>

      <div className="orders-section">
        <h2>История заказов</h2>

        {loading ? (
          <p className="order-loading">Загрузка...</p>
        ) : orders.length === 0 ? (
          <p className="prof-favorites_title">Заказов пока нет</p>
        ) : (
          orders.map(order => (
            <div key={order._id || order.id} className="order-card">
              <h3>Заказ #{order.orderNumber || order._id}</h3>

              {order.items?.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.product.title}</span>
                  <span>
                    {item.product.price}$ × {item.quantity}
                  </span>
                </div>
              ))}

              <strong>Итого: {order.totalPrice?.toFixed(2)}$</strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
