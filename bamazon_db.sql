CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id int auto_increment,
    product_name varchar(30),
    department_name varchar(30),
    price decimal(10, 2),
    stock_quantity int(10),
    primary key (item_id)
)

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Squatty Potty", "Bed & Bath", 20, 200),
		("Nintendo Switch", "Electronics", 299, 50);

