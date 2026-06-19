create database week6db;
use week6db;

CREATE TABLE articles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  journalist VARCHAR(100),
  category VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE Journalist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT
);

ALTER TABLE articles ADD COLUMN journalist_id INT;
ALTER TABLE articles ADD CONSTRAINT fk_article_journalist FOREIGN KEY (journalist_id) REFERENCES Journalist(id) ON DELETE SET NULL ON UPDATE CASCADE;