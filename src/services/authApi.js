import axios from "axios";

const BASE_URL = "https://manga-shop-backend.onrender.com";

export const registerUser = async data => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(
    `${BASE_URL}/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export const getProfile = async token => {
  const res = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
