import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/order.css";

export default function Order() {
  const [order, setOrder] = useState({});

  const [ordered, setOrdered] = useState(false);

  const currentDate = new Date().toLocaleDateString();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchOrder = async id => {
    try {
      if (!token) {
        alert("No token found");
      }

      const res = await axios.get(`https://manga-shop-backend.onrender.com/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  return (
    <div className="order-page">
      <h1>Заказ</h1>

      {!ordered && (
        <>
          <div className="order-info">
            <p>
              <strong>Номер заказа: </strong>#{order._id}
            </p>

            <p>
              <strong>Дата: </strong>

              {currentDate}
            </p>
            <p>
              <strong>Статус: </strong>
              {order.status}
            </p>
          </div>

          <div className="order-page-list">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.product.image} alt={item.product.title} />

                <div>
                  <h3>{item.product.title}</h3>

                  <p>
                    {item.product.price} $ × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2>Итого: {order.totalPrice?.toFixed(2)} $</h2>

            <button className="order__buy-btn" onClick={() => navigate("/")}>
              На главную
            </button>
          </div>
        </>
      )}
    </div>
  );
}
