const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

const dbUrl = 'mongodb://mongo-db:27017/';
const dbName = 'mydb';

async function connect() {
    try {
        const client = new MongoClient(dbUrl);
        await client.connect();
        console.log('Pomyślnie połączono z bazą danych!');

        const db = client.db(dbName);
        const collection = db.collection('testcollection');

        app.get('/', async (req, res) => {
            try {
                const result = await collection.find().toArray();

                res.json(result);
            } catch (err) {
                console.error(err);
                return res.json({ error: 'Wystąpił błąd podczas przetwarzania danych.' });
            }
        });

        app.listen(port, () => {
            console.log(`Serwer działa na porcie: ${port}`);
        });

    } catch (err) {
        console.error('Wystąpił błąd podczas łączenia z bazą.', err);
    }
}

connect();