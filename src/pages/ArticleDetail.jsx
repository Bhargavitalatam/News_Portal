import React from 'react';
import { useParams, Link } from 'react-router-dom';
import mockData from '../mockData/articles.js';

function ArticleDetail() {
  const { id } = useParams();
  const article = mockData.find((a) => a.id === Number(id)) || {};
  const { title = 'Article Not Found', author = '', date = '', content = '', imageUrl = '' } = article;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/articles" data-testid="back-to-articles">← Back to Articles</Link>
      <h1 data-testid="article-title" style={{ marginTop: '1rem' }}>{title}</h1>
      {author && <p data-testid="article-author"><strong>Author:</strong> {author}</p>}
      {date && <p data-testid="article-date"><strong>Date:</strong> {date}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
          data-testid="article-featured-image"
        />
      )}
      <p data-testid="article-content" style={{ marginTop: '1rem' }}>{content}</p>
    </div>
  );
}

export default ArticleDetail;
