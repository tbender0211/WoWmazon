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

//Function that displays products from the WoWmazon Database
function productDisplay(){

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res){

        console.log(divider);
        console.log("\nHorde Auction House\n");
        console.log("Available Items: ");
        console.log(divider);

        for (i=0; i < res.length; i++){

            console.log(res[i].item_id + ". " + res[i].product_name);
            
        }

        console.log(divider);
        itemPurchase();

    });
};

function checkInt(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a positive integer.';
	}
}

//Function where user chooses an item to purchase
function itemPurchase(){

    inquirer.prompt([

    {
        type:"confirm",
        message: "Welcome to the Horde Auction House! Would you like to purchase an item?",
        name:"confirm",
        default: true
    }
    

    ]).then(function(inquirerResponse){

        if(inquirerResponse.confirm){
            
            inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the number of the item you would like to purchase?",
                    validate: checkInt
                },
            
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you like?",
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
                            // console.log(quantity);

                            if(quantity > 0){

                                console.log(divider);
                                console.log("Bid accepted! You've been charged " + res[0].price + " gold and " + res[0].product_name + " has been sent to your mailbox.\n");
                                console.log(divider)
                                
                                var newStockQuantity = quantity -= selectedQuantity;

                                function updateInventory(){

                                    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

                                    connection.query(query, [newStockQuantity, selectedProduct], function(err,res){

                                        if (err) throw err;

                                    })

                                    
                                };

                                updateInventory();

                                inquirer.prompt([

                                    {
                                        type: "confirm",
                                        message: "Would you like the return to the auction house?",
                                        name: "confirm"
                                    }

                                ]).then(function(inquirerResponse){

                                    if (inquirerResponse.confirm){

                                         runWowmazon();

                                    }else{

                                        console.log(divider);
                                        console.log("Thank you for shopping with us! Please come again soon.")

                                    }
                                })
                               

                            }else{

                                console.log("Sorry, the item you've requested is no longer available.")
                                runWowmazon();

                            }

                    });

                    }

                    itemSelect();
                 
            });
            
        }
    })

};


//Function runs program in correct order
function runWowmazon(){
    productDisplay();
};

runWowmazon();