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
    itemPurchase();

});

var productDisplay = function(){

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res){

        console.log("\nHorde Auction House\n");
        console.log("Available Items: ")
        console.log("----------------\n")

        for (i=0; i < res.length; i++){

            console.log(res[i].item_id + ". " + res[i].product_name);
            
        }
    });
};

function itemPurchase(){

    inquirer.prompt([

    {
        type:"confirm",
        message: "Welcome to the Horde Auction House! Would you like to view available items?",
        name:"confirm",
        default: true
    }
    

    ]).then(function(inquirerResponse){

        if(inquirerResponse.confirm){
            
            
            productDisplay();
            
            
        }
    })

};

function purchasePrompt(){
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
    ]);
}