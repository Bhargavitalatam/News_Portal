// src/mockData/articles.js

// Generate 20 mock articles with placeholder content
const articles = [];

const COLORS = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#a18cd1', '#fbc2eb'],
  ['#fda085', '#f6d365'],
  ['#a1c4fd', '#c2e9fb'],
  ['#fd7043', '#ff8a65'],
  ['#26a0da', '#314755'],
];

for (let i = 1; i <= 20; i++) {
  const [c1, c2] = COLORS[(i - 1) % COLORS.length];

  // Build SVG with literal # for gradient reference — encodeURIComponent handles encoding
  const svgRaw = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">`,
    `<defs>`,
    `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0%" stop-color="${c1}" stop-opacity="1"/>`,
    `<stop offset="100%" stop-color="${c2}" stop-opacity="1"/>`,
    `</linearGradient>`,
    `</defs>`,
    `<rect width="600" height="400" fill="url(#grad)"/>`,
    `<text x="300" y="180" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="white" opacity="0.95">Article ${i}</text>`,
    `<text x="300" y="230" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white" opacity="0.75">PulseNews</text>`,
    `</svg>`,
  ].join('');

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
