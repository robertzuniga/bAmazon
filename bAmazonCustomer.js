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

// function readProducts() {
//     // console.log("\n\nCurrent Products Available: \n\n")
//     connection.query("SELECT * FROM products", function (err, results) {
//         if (err) throw err;
        
//         // console.log("results[0].id ==>",results[0].id, "\n\n");
//         console.log("results ==> \n\n",results,"\n\n");
//     })
//     // disconnectFromDB();
// }


function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // console.log("results[0].id ==>",results[0].id, "\n\n");
        // console.log("results ==> \n\n",results,"\n\n");

        console.log("-----------------------------------");

        inquirer
            .prompt([{
                    name: "id",
                    type: "input",
                    message: "Please enter the product ID (1-10): "
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "Please enter the number desired: "
                }
            ])
            .then(function (answer) {
                // console.log("answer = : ", answer);
                // console.log("answer.id             ==> ", answer.id);
                // console.log("answer.stock_quantity ==> ", answer.stock_quantity);
                // console.log("-----------------------------------");
                // console.log("  ")

                // verify the id exist

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    // console.log("results[i].id ==> ", results[i].id);
                    // console.log("answer.id == > ", answer.id);
                    if (parseInt(answer.id) == results[i].id) {
                        chosenItem = results[i];
                        console.log("***********match***************");
                        console.log("chosenItem = ", chosenItem);
                    }
                }
                // console.log("chosenItem.stock_quanty = ", chosenItem.stock_quantity);
                console.log("Available ==> ", chosenItem.stock_quantity);
                // console.log("answer.stock_quantity ==> ", answer.stock_quantity);
                console.log("Requested ==> ", answer.stock_quantity);
                if (chosenItem.stock_quantity >= answer.stock_quantity) {
                    console.log("Yes, we can place your order!");
                    
                    var updatedInStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.stock_quantity);
                    console.log('Updated Stock',updatedInStock);
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: updatedInStock
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            // readProducts();
                            // console.log("answer ", answer);
                        }
                    );


                    //console.log("Order Placed Successfully!");

                } else {
                    console.log("Sorry, we do not have enough in stock, please resubmit new order!")
                }



                disconnectFromDB();

            }) //end inquirer
        // disconnectFromDB();
    }); // end connection.query
}; // end function start




function disconnectFromDB() {
    connection.end();
    // console.log("<> disconnect successful");
};