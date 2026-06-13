// PulseNews SPA Logic & Router

let articlesData = [];

// Global State
const state = {
  currentPath: window.location.pathname,
  searchQuery: '',
};

// Fetch mock articles data
async function fetchArticles() {
  try {
    const response = await fetch('/public/mock-data.json');
    if (!response.ok) {
      // Fallback in case of path differences
      const responseAlt = await fetch('/mock-data.json');
      articlesData = await responseAlt.json();
    } else {
      articlesData = await response.json();
    }
  } catch (error) {
    console.error('Error fetching mock data:', error);
  }
}

// Router logic
async function router() {
  const appElement = document.getElementById('app');
  if (articlesData.length === 0) {
    await fetchArticles();
  }

  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  // Set active class on navbar links
  updateActiveNavLink(path);

  // Route matches
  if (path === '/' || path === '/articles') {
    renderArticlesList(appElement);
  } else if (path.startsWith('/article/')) {
    const id = parseInt(path.split('/')[2], 10);
    renderArticleDetail(appElement, id);
  } else if (path === '/search') {
    const query = searchParams.get('q') || '';
    renderSearchPage(appElement, query);
  } else {
    render404(appElement);
  }

  // Set page title and meta description dynamically
  updateMeta(path);
  
  // Show footer once layout rendering is complete
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.style.display = 'block';
  }

  // Initialize lazy image handlers
  initLazyImages();
}

// Navigates to a specific path
export function navigateTo(path) {
  window.history.pushState({}, '', path);
  router();
}

// Intercept local link clicks for SPA navigation
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href')) {
    const href = link.getAttribute('href');
    // Ensure it's a local path
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigateTo(href);
    }
  }
});

// Handle browser navigation (back/forward buttons)
window.addEventListener('popstate', router);

// Update active states on nav
function updateActiveNavLink(path) {
  const homeLink = document.getElementById('nav-home-link');
  const articlesLink = document.getElementById('nav-articles-link');
  
  if (homeLink) homeLink.classList.remove('active');
  if (articlesLink) articlesLink.classList.remove('active');

  if (path === '/' || path === '/articles') {
    if (homeLink) homeLink.classList.add('active');
    if (articlesLink) articlesLink.classList.add('active');
  }
}

// Set SEO meta tags
function updateMeta(path) {
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (path === '/' || path === '/articles') {
    document.title = 'PulseNews | Modern Digital Journalism';
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'Explore PulseNews, the leading digital news portal bringing you premium articles on technology, science, agriculture, and culture.');
    }
  } else if (path.startsWith('/article/')) {
    const id = parseInt(path.split('/')[2], 10);
    const article = articlesData.find(a => a.id === id);
    if (article) {
      document.title = `${article.title} | PulseNews`;
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', article.excerpt);
      }
    }
  } else if (path === '/search') {
    const query = new URLSearchParams(window.location.search).get('q') || '';
    document.title = `Search results for "${query}" | PulseNews`;
  }
}

// Lazy loading image helper
function initLazyImages() {
  const images = document.querySelectorAll('.article-image:not(.loaded)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.onload = () => {
            img.classList.add('loaded');
          };
          // Trigger source load
          if (img.dataset.src) {
            img.src = img.dataset.src;
          } else {
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px',
      threshold: 0.01
    });

    images.forEach(img => {
      observer.observe(img);
    });
  } else {
    // Fallback if IntersectionObserver is unsupported
    images.forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }
}

// HTML Component: Card component for article grid list
function ArticleCard(article, index) {
  // Eager load the first 3 images (above the fold) to satisfy LCP optimizations
  const isEager = index < 3;
  const placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 338'%3E%3Crect width='100%25' height='100%25' fill='%23121824'/%3E%3C/svg%3E";
  const imgSrc = isEager ? article.image : placeholderSrc;
  const dataSrcAttr = isEager ? '' : `data-src="${article.image}"`;
  const classList = isEager ? 'article-image loaded' : 'article-image';
  const fetchPriorityAttr = isEager ? 'fetchpriority="high"' : '';
  const loadingAttr = isEager ? 'eager' : 'lazy';

  return `
    <article class="article-card" data-testid="article-card">
      <div class="article-image-wrapper">
        <img 
          class="${classList}" 
          data-testid="article-image" 
          src="${imgSrc}"
          ${dataSrcAttr} 
          alt="${article.title}" 
          loading="${loadingAttr}"
          ${fetchPriorityAttr}
          width="600"
          height="338"
        />
      </div>
      <div class="article-info">
        <div class="article-meta">
          <span>By ${article.author}</span>
          <span>&bull;</span>
          <span>${article.date}</span>
        </div>
        <h2 class="article-title" data-testid="article-title" style="font-size: 1.25rem;">${article.title}</h2>
        <p class="article-excerpt">${article.excerpt}</p>
        <a href="/article/${article.id}" class="article-link" data-testid="article-link">Read Article</a>
      </div>
    </article>
  `;
}

// View: Articles list page (`/articles`)
function renderArticlesList(container) {
  const cardsHtml = articlesData.map((article, index) => ArticleCard(article, index)).join('');

  container.innerHTML = `
    <section class="hero-section">
      <h1>PulseNews Journalism</h1>
      <p>Independent analysis, breaking reports, and technical insights from across the globe, optimized for speed and fidelity.</p>
      
      <div class="search-container">
        <form id="search-form" class="search-form" role="search">
          <input 
            type="search" 
            id="search-input" 
            class="search-input" 
            data-testid="search-input" 
            placeholder="Search news articles, topics..." 
            aria-label="Search articles"
            required
          />
          <button type="submit" class="search-button" data-testid="search-button">Search</button>
        </form>
      </div>
    </section>

    <section aria-label="Latest Articles">
      <div class="articles-grid">
        ${cardsHtml}
      </div>
    </section>
  `;

  // Bind search form submit
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('search-input');
      const query = input.value.trim();
      if (query) {
        navigateTo(`/search?q=${encodeURIComponent(query)}`);
      }
    });
  }
}

// View: Article detail page (`/article/:id`)
function renderArticleDetail(container, id) {
  const article = articlesData.find(a => a.id === id);

  if (!article) {
    render404(container);
    return;
  }

  // Generate initial letters for avatar
  const initials = article.author.split(' ').map(n => n[0]).join('').substring(0, 2);

  container.innerHTML = `
    <div class="detail-container">
      <a href="/articles" class="back-link" data-testid="back-link">
        &larr; Back to Articles
      </a>
      
      <article>
        <header class="detail-header">
          <h1 class="detail-title" data-testid="article-title">${article.title}</h1>
          <div class="detail-meta">
            <div class="author-avatar" aria-hidden="true">${initials}</div>
            <div>
              <p style="font-weight: 700; color: var(--text-primary);">${article.author}</p>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${article.date}</p>
            </div>
          </div>
        </header>

        <div class="detail-image-container">
          <img 
            class="detail-image" 
            src="${article.image}" 
            alt="${article.title}" 
            fetchpriority="high"
            width="800"
            height="480"
          />
        </div>

        <div class="detail-content">
          ${article.content.split('\n\n').map(para => `<p>${para}</p>`).join('')}
        </div>
      </article>
    </div>
  `;
}

// View: Search results page (`/search`)
function renderSearchPage(container, query) {
  const filtered = articlesData.filter(article => {
    const q = query.toLowerCase();
    return article.title.toLowerCase().includes(q) || article.content.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q);
  });

  const cardsHtml = filtered.map((article, index) => ArticleCard(article, index)).join('');

  container.innerHTML = `
    <div class="search-results-header">
      <a href="/articles" class="back-link">
        &larr; Back to Articles
      </a>
      <h1>Search Results</h1>
      <p class="search-results-meta">
        Query: <span class="highlight-query" data-testid="search-query">${escapeHtml(query)}</span> &bull; 
        Results found: <span class="highlight-query" data-testid="search-results-count">${filtered.length}</span>
      </p>
    </div>

    ${filtered.length > 0 ? `
      <section aria-label="Search results cards">
        <div class="articles-grid">
          ${cardsHtml}
        </div>
      </section>
    ` : `
      <div class="no-results">
        <h2>No matches found</h2>
        <p>We couldn't find any articles matching "${escapeHtml(query)}". Try different keywords or browse home.</p>
        <a href="/articles" class="search-button" style="text-decoration: none; display: inline-block;">Browse Articles</a>
      </div>
    `}
  `;
}

// View: 404 Not Found page
function render404(container) {
  container.innerHTML = `
    <div class="no-results" style="margin-top: 4rem;">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist or has been relocated.</p>
      <a href="/articles" class="search-button" style="text-decoration: none; display: inline-block;">Return Home</a>
    </div>
  `;
}

// Helper to sanitize HTML display
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Trigger initial route match on file load
router();
