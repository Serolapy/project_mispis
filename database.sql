CREATE DATABASE project_mispis;

CREATE TABLE persone (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT,
	phone TEXT
);

CREATE TYPE type_of_loading AS ENUM ('pallet', 'container', 'tank');
CREATE TABLE product (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	type type_of_loading NOT NULL
);

CREATE TABLE controller (
	id SERIAL PRIMARY KEY,
	document_num TEXT NOT NULL,
	persone_id INTEGER NOT NULL,

	FOREIGN KEY (persone_id) REFERENCES persone (id) ON DELETE CASCADE
);

CREATE TYPE class_of_danger AS ENUM ('0','1','2','3','4','5','6','7','8','9');
CREATE TABLE classification (
	id SERIAL PRIMARY KEY,
	danger_class class_of_danger NOT NULL,
	controller_id INTEGER NOT NULL,

	FOREIGN KEY (controller_id) REFERENCES controller (id) ON DELETE CASCADE
);

CREATE TYPE transport AS ENUM ('truck', 'ship');
CREATE TABLE cargo (
	id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL,
	owner_id INTEGER NOT NULL,
	arrival_date TIMESTAMP NOT NULL,
	departure_date TIMESTAMP,
	arrival_type transport NOT NULL,
	departure_type transport,
	classification_id INTEGER NOT NULL,
	weight REAL, 

	FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL,
	FOREIGN KEY (owner_id) REFERENCES persone (id) ON DELETE SET NULL,
	FOREIGN KEY (classification_id) REFERENCES classification (id) ON DELETE SET NULL
);

CREATE TYPE access_lvl AS ENUM ('admin', 'controller');
CREATE TABLE worker (
	id INTEGER PRIMARY KEY,
	login TEXT NOT NULL,
	password TEXT NOT NULL,
	access_level access_lvl NOT NULL,

	FOREIGN KEY (id) REFERENCES persone (id) ON DELETE CASCADE
);