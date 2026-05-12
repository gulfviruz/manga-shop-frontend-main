import { useEffect, useState } from "react";
import { searchManga, fetchManga } from "../services/mangaApi";

import MangaCard from "../components/MangaCard";
import Dropdown from "../components/Dropdown";

import "../assets/css/manga.css";
import "../assets/css/catalog.css";

export default function Catalog() {
  const [mangaList, setMangaList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchManga().then(data => {
      setMangaList(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const results = await searchManga(query);

    setMangaList(results);

    setLoading(false);
  };

  const sortOptions = [
    {
      label: "По умолчанию",
      value: "default",
    },
    {
      label: "По названию А-Я",
      value: "title-asc",
    },
    {
      label: "По названию Я-А",
      value: "title-desc",
    },
  ];

  const sortedList = [...mangaList];

  if (sort === "title-asc") {
    sortedList.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "title-desc") {
    sortedList.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div className="container-catalog">
      <h1 className="catalog-title">Каталог манги</h1>

      <div className="catalog-search-bar">
        <input
          type="text"
          placeholder="Поиск манги..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="catalog-search-input"
        />

        <button onClick={handleSearch} className="catalog-search-button">
          Искать
        </button>

        <div className="catalog-dropdown">
          <Dropdown options={sortOptions} onSelect={setSort} defaultLabel="Сортировка" />
        </div>
      </div>

      {loading ? (
        <div className="catalog-loading">Загрузка...</div>
      ) : sortedList.length === 0 ? (
        <div className="no-results">Ничего не найдено</div>
      ) : (
        <div className="manga-grid">
          {sortedList.map(manga => (
            <MangaCard key={manga._id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}
