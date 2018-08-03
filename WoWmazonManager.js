var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "NodeNerd1993",
    database: "WoWmazon_db"

});


var divider = "---------------------------\n";

connection.connect(function(err){

    if(err) throw err;

});

function managementOptions(){

    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "Welcome WoWmazon management, what function should you like to perform today?",
            choices: ["View Inventory", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(manager){

        var query = "";

        if(manager.task === "View Inventory"){

            var query = "SELECT * FROM products";

            connection.query(query, function(err,res){

                if (err) throw err;

                console.log(divider);
                console.log("Auction House Total Inventory: ")
                console.log(divider);
                console.log(res);
                console.log(divider);

            })

        }

        if(manager.task === "View Low Inventory"){

            var query = "SELECT * FROM products WHERE stock_quantity BETWEEN 0 and 5";

            connection.query(query, function(err,res){

                if (err) throw err;

                console.log(divider);
                console.log("These products are low in stock: ");
                console.log(divider);

                for(i=0; i < res.length; i++){

                    console.log(res[i].item_id + ". " + res[i].product_name + " | Quantity Remaining: " + res[i].stock_quantity);
                    console.log(divider);
                }

            })
        }
    })
}

function manageWowmazon(){
    managementOptions();
};

manageWowmazon();