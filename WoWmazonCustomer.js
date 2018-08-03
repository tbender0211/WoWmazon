var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "NodeNerd1993",
    database: "WoWmazon_db"

});



connection.connect(function(err){

    if(err) throw err;

});

//Function that displays products from the WoWmazon Database
function productDisplay(){

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res){

        console.log("\nHorde Auction House\n");
        console.log("Available Items: ")
        console.log("----------------\n")

        for (i=0; i < res.length; i++){

            console.log(res[i].item_id + ". " + res[i].product_name);
            
        }

        console.log("------------------");
        itemPurchase();

    });
};

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
                    message: "What is the number of the item you would like to purchase?"
                },
            
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you like?"
                }
            ]).then(function(inquirerResponse){

                    var selectedProduct = parseInt(inquirerResponse.id);
                    var selectedQuantity = parseInt(inquirerResponse.quantity);

                    console.log(selectedProduct);
                    console.log(selectedQuantity);

                    function updateInventory(){
    
                        var query = "SELECT * FROM products WHERE item_id = ?";
                        connection.query(query, [selectedProduct], function(err,res){
                            if (err) throw err;
                            console.log(res);
                    })

                    }

                    updateInventory();

            });
            
        }
    })

};

//Function that matches id chosen from the database and updates quantity



function runWowmazon(){
    productDisplay();
};

runWowmazon();