import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample GET route
app.get('/api/ping', (_req, res) => {
  res.json({ message: 'pong 🏓' });
});

// Sample POST route
app.post('/api/echo', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
