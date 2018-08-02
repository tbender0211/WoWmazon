var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NodeNerd1993",
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    productDisplay();
});

function productDisplay(){

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res){

        for (i=0; i < res.length; i++){

            console.log(res[i].product_name);
            
        }
    });
};