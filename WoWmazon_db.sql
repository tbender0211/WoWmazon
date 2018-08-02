DROP DATABASE IF EXISTS WoWmazon_db;

CREATE DATABASE WoWmazon_db;

USE WoWmazon_db;

CREATE TABLE products (
	item_id int auto_increment,
    product_name varchar(100),
    department_name varchar(30),
    price decimal(10, 2),
    stock_quantity int(10),
    primary key (item_id)
)

