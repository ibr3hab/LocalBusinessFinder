import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3001;

app.get('/nearbysearch', async (req, res) => {
  const { location, radius, GoogleAPI } = req.query;
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${GoogleAPI}`);
  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
