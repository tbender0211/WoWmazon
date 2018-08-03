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
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Primal Mana", "Trade Goods", 323.63, 97),
		("Siamese Cat (Common)", "Battle Pets", 88.80, 8),
        ("Nightmare Whelpling", "Battle Pets", 49998.01, 8),
        ("Copper Ore (50)", "Trade Goods", 2500, 7),
        ("Flask of the Countless Armies", "Consumables", 147.99, 16),
        ("Lavish Suramar Feast", "Consumables", 99.19, 258),
        ("Rough Boomstick", "Weapons", 2, 10),
        ("Ranseur of Hatred", "Weapons", 149.74, 6),
        ("Replica Deathmist Mask", "Armor", 59998.49, 2),
        ("Saber's Eye of Agility", "Gems", 2695.99, 15),
        ("Deadly Eye of Prophecy", "Gems", 379.50, 147),
        ("Runescale Koi (200)", "Trade Goods", 26.15, 5),
        ("Schematic: Lightning Etched Specs", "Recipes", 8401.33, 2);
        
SELECT * FROM products;