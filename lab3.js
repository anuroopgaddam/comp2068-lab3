/**
 * Created by anuroop on 2017-01-26.
 */
// lab3.js

// bring connect into our file
var connect = require('connect');

// load in the url module to parse url parameters
var url = require('url');

// filesystem module
var fs = require('fs');

// instantiate our app from connect
var app = connect();

// Calculator function
function Calculator(req, res){
    //collect the parameters [method,x,y] from url
    // http://localhost:3000/lab3?method=add&x=16&y=4
    var parameters = url.parse(req.url, true).query;
    var x = parameters.x;
    var y = parameters.y;
    var methodname = parameters.method ;
    var result;
    var symbol;

    switch(methodname){
        case "add":
            result=parseFloat(x)+parseFloat(y);
            symbol = "+";
            break;
        case "subtract":
            result=parseFloat(x)-parseFloat(y);
            symbol = "-";
            break;
        case "multiply":
            result=parseFloat(x)*parseFloat(y);
            symbol = "*";
            break;
        case "divide":
            result= (parseFloat(x))/(parseFloat(y));
            symbol = "/";
            break;
        default:
            symbol ='';
            result= "Enter correct method name";
    }
    res.writeHead(200, {

        "Content-Type": "text-plain"

    });

    //display result
    if(symbol!='') {
        res.write('Output: ' + x + ' ' + symbol + ' ' + y + ' = ' + String(result) + '\n');
        res.end()
    }
else{
        res.end("Error: " + String(result));
    }
}

app.use('/lab3', Calculator)

// start the server
// port 3000
app.listen(3000)

// spit out to the console telling us
// that the server is running
console.log('Connect running on port 3000')
