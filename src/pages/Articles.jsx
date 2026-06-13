import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../mockData/articles.js";
import ArticleCard from "../components/ArticleCard.jsx";
import styles from "./Articles.module.css";

function Articles() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading} data-testid="articles-heading">Articles Listing Page</h1>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search articles..." value={query} onChange={(e) => setQuery(e.target.value)} data-testid="search-input" />
          <button onClick={handleSearch} data-testid="search-button">Search</button>
        </div>
      <div className={styles.grid} data-testid="articles-list">
        {mockData.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Articles;
