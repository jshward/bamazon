/*
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
*/
var mysql = require("mysql");
var inquirer = require('inquirer')
var products = [];
var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,

	// Your username
	user: "root",

	// Your password
	password: "root",
	database: "bamazonDB"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	displayProducts();
});

function displayProducts() {
	console.log("Available for sale right now:\n");
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		// Log all results of the SELECT statement
		for (var i = 0; i < res.length; i++) {
			products.push(res[i].item_id);


			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
		}
		console.log("-----------------------------------\n");

		sales();
	});
}

function sales() {

	inquirer.prompt([
		// Here we create a basic text prompt.
		{
			type: "input",
			message: "What is the id of the item you'd like to purchase?",
			name: "product_id"
		}
	])
		.then(function (data) {


			var cartItem = parseInt(data.product_id);


			if (products.includes(cartItem) === true) {

				inquirer.prompt([
					// Here we create a basic text prompt.
					{
						type: "input",
						message: "How many would you like to purchase?",
						name: "ordered_qty"
					}
				])
					.then(function (data) {
						var orderQty = parseInt(data.ordered_qty)
						connection.query(
							"SELECT price, stock_quantity FROM products WHERE ?",
							{
								item_id: cartItem
							},
							function (err, res) {
								if (err) throw err;
								var price = parseFloat(res[0].price)
								var stkQty = res[0].stock_quantity;
								if (orderQty <= stkQty) {
									var newQty = parseInt(stkQty) - parseInt(orderQty);
									connection.query(
										"UPDATE products SET ? WHERE ?",
										[
											{
												stock_quantity: newQty
											},
											{
												item_id: cartItem
											}
										],
										function (err, res) {


											console.log("Success. Your total is $" +
												parseFloat(price * orderQty) +
												". Since your total is greater than $60.55, shiiping is free!");
											console.log("Your order will be taken to the delivery rowboat at the first convenience. Expect it eventually.");

										})



								} else {
									console.log("We haven't enough of that Item in stock.\nTry again later (we still won't have that many, but can't just tell you to bugger off can we?).");
									connection.end();
								}
							}
						)
					});

			}
			else {
				console.log("That's not a valid item, guv'nor.");
				connection.end();
			}
		})
}


