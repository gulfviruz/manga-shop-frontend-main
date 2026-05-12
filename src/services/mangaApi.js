import axios from "axios";

const BASE_URL = "https://manga-shop-backend.onrender.com";

export const fetchManga = async () => {
  const response = await axios.get(`${BASE_URL}/products`);

  return response.data;
};

export const fetchMangaById = async id => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);

  return response.data;
};

export const searchManga = async query => {
  const response = await axios.get(`${BASE_URL}/products`);

  return response.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
};
