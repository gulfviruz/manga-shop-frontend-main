import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../assets/css/auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Пароли не совпадают" });
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/profile");
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = {};

        err.response.data.errors.forEach(error => {
          errorMessages[error.path] = error.msg;
        });

        setErrors(errorMessages);
      } else if (err.response?.data?.message) {
        setErrors({
          general: err.response.data.message,
        });
      } else {
        setErrors({
          general: "Ошибка регистрации",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          type="text"
          placeholder="Имя"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="auth__input"
        />
        {errors.name && <p className="auth__error">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="auth__input"
        />
        {errors.email && <p className="auth__error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="auth__input"
        />
        {errors.password && <p className="auth__error">{errors.password}</p>}

        <input
          type="password"
          placeholder="Подтвердите пароль"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="auth__input"
        />
        {errors.confirmPassword && <p className="auth__error">{errors.confirmPassword}</p>}

        {errors.general && <p className="auth__error">{errors.general}</p>}

        <button className="auth__button">Зарегистрироваться</button>
        <p className="auth__text">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="auth__link">
            Войти
          </Link>
        </p>
      </form>
      {loading && <Loader />}
    </div>
  );
}
