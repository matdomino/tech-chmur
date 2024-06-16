import { createClient } from 'redis';
import postgres from 'postgres';
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

const redisClient = createClient({url: 'redis://redis'});
redisClient.on('error', err => console.log('Błąd klienta Redis', err));
await redisClient.connect();

const sql = postgres("postgres://postgres:example@db:5432/postgres");

app.use(bodyParser.json());

app.post("/add", async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    res.status(400).send("BŁĄD: Klucz i wartość są wymagane");
    return;
  }
  redisClient
    .set(key, value)
    .then((result) => {
      res.status(200).send({ wynik: result, status: "OK" });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
});

app.get("/get/:key", async (req, res) => {
  const key = req.params.key;
  if (!key) {
    res.status(400).send("BŁĄD: Klucz jest wymagany");
    return;
  }
  redisClient
    .get(key)
    .then((value) => {
      res.status(200).send({ klucz: key, wartość: value, status: "OK" });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
});

app.get("/users", async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users`;
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(400).send("Imię i wiek są wymagane");
    return;
  }
  try {
    const user = await sql`INSERT INTO users (name, age) VALUES (${name}, ${age}) RETURNING *`;
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});
