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
  title VARCHAR(100) NOT NULL,
  tags VARCHAR(50) NOT NULL,
  link VARCHAR(255),
  description TEXT,
  image VARCHAR(255),
  createdDate DATE DEFAULT CURRENT_DATE,
  userId INTEGER REFERENCES users(id)
);
