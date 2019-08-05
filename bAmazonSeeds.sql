-- Robert Zuniga
-- bAmazonSeeds

DROP DATABASE IF EXISTS bAmazon;
CREATE DATABASE bAmazon;
USE bAmazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Executive Office Chair","Office", 999.99, 10),
("Highlighter Pen Set","Office", 99.99, 100),
("Lightbulb","Office", 9.99, 1000),
("Binoculars","Sports", 1999.99, 20),
("Catchers Glove","Sports", 199.99, 200),
("Mouthpiece","Sports", 19.99, 2000),
("Laptop","Electronics", 2999.99, 30),
("Monitor","Electronics", 299.99, 300),
("Earbuds","Electronics", 29.99, 3000),
("Engagement Ring","Jewelry", 3999.99, 40);

SELECT * FROM products;