// Robert Zuniga
var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id ==> " + connection.threadId);
    connection.query("SELECT * FROM products", function (err,res){
        if (err) throw err;
        console.log(res);
    })
    connection.end();
})

// console.log(res);
