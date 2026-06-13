import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';

function ArticleCard({ article }) {
  const { id, title, excerpt, imageUrl } = article;
  return (
    <div className={styles.card} data-testid={`article-card-${id}`}>
      <Link to={`/article/${id}`} className={styles.link} data-testid={`article-link-${id}`}>
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className={styles.image}
          data-testid="article-image"
        />
        <h2 className={styles.title} data-testid={`article-title-${id}`}>{title}</h2>
        <p className={styles.excerpt} data-testid={`article-excerpt-${id}`}>{excerpt}</p>
      </Link>
    </div>
  );
}

export default ArticleCard;
