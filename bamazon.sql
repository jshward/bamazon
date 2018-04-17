DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazondb;
USE bamazondb;
CREATE TABLE products
(
	item_id INT NOT NULL PRIMARY KEY,
	product_name VARCHAR(45) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL (10,2) NOT NULL,
	stock_quantity INT NOT NULL
);
INSERT INTO products
	(item_id,product_name,department_name, price, stock_quantity)
VALUES
	("5570326", 'Waffle Maker', 'Housewares', '59.87', '10000'),
	("4968887", 'Big TV', 'Electronic Devices', '4999.56', '500'),
	("6697145", 'Smaller TV', 'Electronic Devices', '499.96', '1500'),
	("0115846", 'Tiny TV', 'Electronic Devices', '49.97', '100000'),
	("8482258", 'Home Barkeeper Starter Kit', 'Housewares', '149.99', '50'),
	("3864603", 'My First Monkey', 'Pets', '10599.99', '2'),
	("5989906", 'Insto-Matic Diaper Changing Table', 'Experimental Infant Devices', '679.99', '1'),
	("4881989", 'Walk-In Humidor', 'Housewares', '15999.99', '60'),
	("4881988", 'Walk-In Humidifier', 'Housewares', '159.99', '600'),
	("9797321", 'Purple Mattress', 'Bedding', '1999.99', '79');