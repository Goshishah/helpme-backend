CREATE DATABASE helpme;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts (
	id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
	email VARCHAR (255) UNIQUE NOT NULL,
	firstname VARCHAR (50) NOT NULL,
	lastname VARCHAR (50),
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

CREATE TABLE roles(
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE account_roles (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT NULL,
  role_id uuid NOT NULL,
  grant_date TIMESTAMP,
  FOREIGN KEY (role_id)
      REFERENCES roles (id),
  FOREIGN KEY (user_id)
      REFERENCES accounts (id)
);

INSERT INTO roles (name)
  VALUES ("SUPER_ADMIN");