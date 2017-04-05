CREATE DATABASE hackathon;
USE hackathon;



CREATE USER 'admin'@'localhost' IDENTIFIED BY 'UserPassword';
GRANT ALL ON hackathon.* to 'admin'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'admin'@'%' IDENTIFIED BY 'UserPassword';
GRANT ALL VIEW ON hackathon.* to 'admin'@'%';
FLUSH PRIVILEGES;



CREATE TABLE item (
	id BIGINT,
	name VARCHAR(50),
	value INT
);


