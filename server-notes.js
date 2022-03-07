//1.
const express = require("express");
const server = express();
const port = 3000;
const user = {
   Name : "Adhavan",
   Age : "20"
}

server.get("/",(rep,res) => {
   res.setHeader('Content-Type','application/json');
   res.send(JSON.stringify(user))
})

server.listen(port, console.log(`Your server listening on localhost ${port}`));
server.listen(port, () => { 
   console.log(`Your server listening on localhost ${port}`)
});

2.
let express = require('express');
let app = express();

let requestTime = function(req,res,next){
   req.requestTime = Date.now()
   next()
}

app.use(requestTime)

app.get('/',(req,res) =>{
   let responseText = "Hello World<br>"
   responseText += '<small>RequestTime at:' + req.requestTime + '</small>'
   res.send(responseText)

})

app.listen(3000)



3.
const http = require("http");

const server = http.createServer(() => {
   console.log("Hey fuck I can here you")
})

server.listen(3000);

4.
const http = require('http');

const server = http.createServer((request,response) => {
   console.log(request.headers)
   response.setHeader("Content-Type", "text/html");
   response.end("<h1>Hello</h1>");
})
server.listen(3000);

5.
const http = require('http');

const server = http.createServer((request,response) => {
   const user ={
      Name : 'ADHAVAN',
      Age : '20'
   }
   response.setHeader('Content-Type',"Application/json");
   response.end(JSON.stringify(user));
})

server.listen(3000);

6.
const express = require('express');

const app = express();

app.get('/',(req,res) => {
 const user ={
     name:'john',
     hobby:'soccer'
 } 
    res.send(user);
})

app.listen(3000);


7.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get('/',(req,res) => {
   res.send("getting root");
});

app.get('/page2', (req,res) => {
   res.send("getting page2")
});

app.post("/page3", (req,res) => {
   console.log(req.body)
   
   res.send("success");
});

app.listen(3000)

8.
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get('/:id',(req,res) => {
   console.log(req.query);
   req.body
   console.log(req.headers);
   console.log(req.params);
   res.status(404).send("getting root");

});

app.listen(3000)


9.

const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'))


app.listen(3000);




