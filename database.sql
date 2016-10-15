CREATE DATABASE weekend4;

CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task varchar(500) NOT NULL,
	complete boolean
)

ALTER TABLE todo
ALTER COLUMN complete SET DEFAULT false;
