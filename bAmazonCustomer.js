// Robert Zuniga
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("<>    connect successful...id ==> " + connection.threadId);
    start();
    //  disconnectFromDB();
});

function readProducts() {
    // console.log("\n\nCurrent Products Available: \n\n")
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // console.log("results[0].id ==>",results[0].id, "\n\n");
        // console.log("results ==> \n\n",results,"\n\n");
    })
    // disconnectFromDB();
}


function start() {
    readProducts();
    console.log("-----------------------------------");

    inquirer
        .prompt([{
                name: "id",
                type: "input",
                message: "Please enter the product ID: "
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "Please enter the number desired: "
            }
        ])
        .then(function (answer) {
            console.log(answer);
            console.log("answer.id             ==> ", answer.id);
            console.log("answer.stock_quantity ==> ", answer.stock_quantity);
            console.log("-----------------------------------");
            console.log("  ")



            disconnectFromDB();

        })



};




function disconnectFromDB() {
    connection.end();
    // console.log("<> disconnect successful");
};