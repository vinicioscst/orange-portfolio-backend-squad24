CREATE DATABASE banco_local_hackathon_pg;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  fullName VARCHAR(200) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  isGoogleAccount BOOLEAN DEFAULT false
);

CREATE TABLE projects(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  tags VARCHAR(50),
  link VARCHAR(255),
  description VARCHAR(255),
  image VARCHAR(255),
  createdDate VARCHAR(100),
  userId INTEGER REFERENCES users(id)
);
