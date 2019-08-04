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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
    })
    start();
    disconnectFromDB();
});


function start() {
console.log("-----------------------------------");

    inquirer
    .prompt([
    {
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
.then (function(answer) {
console.log(answer);
console.log("answer.id           ==> ",answer.id);
console.log("answer.stock_quanty ==> ",answer.stock_quantity);
console.log("-----------------------------------");
}
)

};




function disconnectFromDB() {
    connection.end();
    // console.log("<> disconnect successful");
};


// console.log(res);