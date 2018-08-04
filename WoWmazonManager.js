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

        if(manager.task === "Add to Inventory"){
            
            productDisplay();

        }

        if(manager.task === "Add New Product"){

        }
    })
};

function checkInt(value) {

	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {

        return true;
        
	} else {

        return 'Please enter a positive integer.';
        
	}
};

function addInventory(){

    inquirer.prompt([

        {
            type: "input",
            name: "id",
            message: "What is the number of the item you would like to update?",
            validate: checkInt
        },
    
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add to inventory?",
            validate: checkInt
        }

    ]).then(function(inquirerResponse){

        //Variables convert user input to integer
        var selectedProduct = parseInt(inquirerResponse.id);
        var selectedQuantity = parseInt(inquirerResponse.quantity);

        // console.log(selectedProduct);
        // console.log(selectedQuantity);

        
        //Function that matches id chosen to the item in the database
        function itemSelect(){

            var query = "SELECT * FROM products WHERE item_id = ?";

            connection.query(query, [selectedProduct], function(err,res){

                if (err) throw err;
                // console.log(res);

                var quantity = res[0].stock_quantity;
                    
                var newStockQuantity = quantity += selectedQuantity;

                function updateInventory(){

                    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

                    connection.query(query, [newStockQuantity, selectedProduct], function(err,res){

                        if (err) throw err;
                        
                        connection.query("SELECT * FROM products WHERE item_id = ?", [selectedProduct], function(err,res){

                            console.log("Inventory updated! The auction house now has " + res[0].stock_quantity + " "  + res[0].product_name + " in stock.");
                        
                        })

                    })

                    
                };

                updateInventory();

            })
        }

        itemSelect();
    })
};

function createProduct(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product to be addded?",
            name: "name",
        },
        {
            type: "input",
            message: "To what department does this product belong?",
            name: "department"
        },
        {
            type: "input",
            message: "For how much would you like to sell the product?",
            name: "price",
        },
        {
            type: "input",
            message: "How many of the product would you like to add?",
            name: "quantity",
            validate: checkInt
        }
    ]).then(function(inquirerResponse){

        var name = inquirerResponse.name;
        var department = inquirerResponse.department;
        var price = inquirerResponse.price;
        var quantity = inquirerResponse.quantity;

        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";

        connection.query(query, function(err,res){
            console.log("Product added to inventory.")
        });
    });


};

//Function that displays products from the WoWmazon Database
function productDisplay(){

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res){

        console.log(divider);
        console.log("Total Inventory: ");
        console.log(divider);

        for (i=0; i < res.length; i++){

            console.log(res[i].item_id + ". " + res[i].product_name + " | Quantity Remaining: " + res[i].stock_quantity);
            
        }

        console.log(divider);
        addInventory();

    });
};

function chooseProduct(){

    productDisplay();

}

function manageWowmazon(){

    managementOptions();

};

manageWowmazon();