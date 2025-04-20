const express = require('express');
const Mercury = require('@postlight/mercury-parser');
const app = express();

app.get('/parser', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Parsing failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mercury API running on port ${PORT}`));
