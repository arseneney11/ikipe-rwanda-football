const express = require('express');
const router = express.Router();
const { transfers } = require('../data');

router.get('/', (req, res) => {
  const { status, type } = req.query;
  let result = [...transfers];
  if (status) result = result.filter(t => t.status === status);
  if (type) result = result.filter(t => t.type.toLowerCase() === type.toLowerCase());
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ success: true, data: result, total: result.length });
});

module.exports = router;
