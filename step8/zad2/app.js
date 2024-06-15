const express = require('express');
const { createClient } = require('redis');

const app = express();
app.use(express.json());

const client = createClient({
  url: `redis://redis:6379`
});

client.on('connect', () => console.log('Connected to Redis'));
client.on('error', (err) => console.error('Redis client error', err));

client.connect();

app.post('/messages', async (req, res) => {
  try {
    const { message } = req.body;
    await client.rPush('messages', message);
    res.status(201).send('Message added');
  } catch (error) {
    res.status(500).send('Error adding message');
  }
});

app.get('/messages', async (req, res) => {
  try {
    const messages = await client.lRange('messages', 0, -1);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send('Error getting messages');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
