// src/mockData/articles.js

// Generate 20 mock articles with placeholder content
const articles = [];

const COLORS = [
  ['%23667eea', '%23764ba2'],
  ['%23f093fb', '%23f5576c'],
  ['%234facfe', '%2300f2fe'],
  ['%2343e97b', '%2338f9d7'],
  ['%23fa709a', '%23fee140'],
  ['%23a18cd1', '%23fbc2eb'],
  ['%23ffecd2', '%23fcb69f'],
  ['%23a1c4fd', '%23c2e9fb'],
  ['%23fd7043', '%23ff8a65'],
  ['%2326a0da', '%23314755'],
];

for (let i = 1; i <= 20; i++) {
  const colorPair = COLORS[(i - 1) % COLORS.length];
  const svgRaw = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${colorPair[0].replace('%23','#')};stop-opacity:1"/><stop offset="100%" style="stop-color:${colorPair[1].replace('%23','#')};stop-opacity:1"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="white" opacity="0.9">Article ${i}</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white" opacity="0.7">PulseNews</text></svg>`;
  const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgRaw)}`;

  articles.push({
    id: i,
    title: `Sample Article ${i}: Breaking News and Analysis`,
    excerpt: `This is a short excerpt for article ${i}. Get the full story with in-depth analysis and expert commentary on the latest developments.`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `.repeat(10),
    imageUrl,
    author: `Author ${i}`,
    date: `2023-01-${String(i).padStart(2, '0')}`,
  });
}

export default articles;
