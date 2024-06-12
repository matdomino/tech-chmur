const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

mongoose
	.connect('mongodb://db/db')
  .then(() => console.log('Połączono z bazą danych.'))

const User = mongoose.model('User', {
  name: String,
  last_name: String,
});

app.get('/users', async (req, res) => {
	try {
		const result = await User.find();
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Błąd serwera");
	}
});

app.listen(port, () => {
	console.log(`Serwer działa na http://localhost:${port}`);
});