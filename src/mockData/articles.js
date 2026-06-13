// src/mockData/articles.js

// Generate 20 mock articles with placeholder content
const articles = [];

for (let i = 1; i <= 20; i++) {
  articles.push({
    id: i,
    title: `Sample Article ${i}`,
    excerpt: `This is a short excerpt for article ${i}.`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(50), // ~500 words
    imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23aaa">Article ${i}</text></svg>`,
    author: `Author ${i}`,
    date: `2023-01-${String(i).padStart(2, '0')}`,
  });
}

export default articles;
