SET CLIENT_ENCODING TO 'UTF8';

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR ( 20 ) UNIQUE NOT NULL
);

INSERT INTO users(username)
VALUES('user');