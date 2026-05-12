import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

import "../assets/css/cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { cart, clearCart, updateQuantity, removeFromCart, loading } = useCart();
  const token = localStorage.getItem("token");

  const handleOrder = async () => {
    try {
      const res = await axios.post(
        "https://manga-shop-backend.onrender.com/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await clearCart();

      const orderId = res.data._id;
      navigate(`/orders/${orderId}`);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Ошибка оформления заказа");
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const confirmPurchase = () => {
    handleOrder();

    setModalOpen(false);

    alert("Мы получили ваш заказ!");
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!loading && cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Корзина</h1>
        <p className="cart-empty">Корзина пуста</p>
      </div>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <div className="cart-page">
        <h1>Корзина</h1>

        <div className="cart-list">
          {cart.map(item => (
            <div key={item.productId || item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.product.image} alt={item.title} />
              </div>

              <div className="cart-item-info-container">
                <div className="cart-item-info">
                  <h3>{item.product.title}</h3>
                  <p className="price">
                    {item.product.price} $ × {item.quantity}
                  </p>
                </div>

                <div className="cart-item-btn-container">
                  <div className="cart-item-count">
                    <button
                      className="cart-item-count-btn"
                      onClick={() => {
                        if (item.quantity === 1) {
                          alert("Количество не может быть меньше 1");
                          return;
                        }
                        updateQuantity(item.product._id, item.quantity - 1);
                      }}
                    >
                      -
                    </button>
                    <div className="cart-item-quantity">{item.quantity}</div>
                    <button
                      className="cart-item-count-btn"
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id || item._id)}
                    className="cartdelete__btn"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="total-box">
            <span>Итого:</span>
            <strong>{total.toFixed(2)}$</strong>
          </div>

          <div className="cart-actions">
            <button onClick={clearCart} className="clearcart__btn">
              Очистить
            </button>

            <button onClick={openModal} className="checkout__btn">
              Заказать
            </button>
          </div>
          <Modal
            isOpen={modalOpen}
            title="Подтверждение покупки"
            message={`Вы хотите оформить заказ на ${total?.toFixed(2)}$?`}
            onConfirm={confirmPurchase}
            onCancel={() => setModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
