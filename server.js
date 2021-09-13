const express = require('express');

const app = express();


app.get('/',(req,res) =>{
	res.send("success");
})

app.listen(3000,() => {
	console.log("server running succesfully on port 3000")
})