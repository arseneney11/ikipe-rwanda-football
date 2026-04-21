// news.js
const express = require('express');
const router = express.Router();
const { news } = require('../data');

router.get('/', (req, res) => {
  const { category, featured } = req.query;
  let result = [...news];
  if (category) result = result.filter(n => n.category.toLowerCase().includes(category.toLowerCase()));
  if (featured === 'true') result = result.filter(n => n.featured);
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ success: true, data: result, total: result.length });
});

router.get('/:id', (req, res) => {
  const article = news.find(n => n.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
  res.json({ success: true, data: article });
});

module.exports = router;
