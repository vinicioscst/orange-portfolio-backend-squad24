CREATE DATABASE banco_local_hackathon_pg;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  fullName VARCHAR(200) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);