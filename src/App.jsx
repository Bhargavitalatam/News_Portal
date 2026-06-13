import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Articles from './pages/Articles.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Search from './pages/Search.jsx';
import './App.module.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/search" element={<Search />} />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
