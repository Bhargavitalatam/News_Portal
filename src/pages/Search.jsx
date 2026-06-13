import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import mockData from '../mockData/articles.js';
import ArticleCard from '../components/ArticleCard.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const lower = query.toLowerCase();
    const filtered = mockData.filter(
      (a) =>
        a.title.toLowerCase().includes(lower) ||
        a.excerpt.toLowerCase().includes(lower) ||
        a.content.toLowerCase().includes(lower)
    );
    setResults(filtered);
  }, [query]);

  return (
    <div data-testid="search-page" style={{ padding: '2rem' }}>
      <Link to="/articles" data-testid="back-to-articles">← Back to Articles</Link>
      <h2 data-testid="search-query-display">Search results for "{query}"</h2>
      <p data-testid="results-count">{results.length} result(s) found</p>
      <div data-testid="search-results-list" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {results.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Search;
