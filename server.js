const express = require('express');
const cors = require('cors');
// const e = require('express');
const knex = require('knex');


const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : '73994812',
	  database : 'SmartDetch-db'
	}
  });
 
  // db.select('*').from('users').then(data => {
	 //  console.log(data);
  // });

db.select('*').from('users').then(data =>{
	console.log(data)
});

const app = express();



app.use(express.json());
app.use(cors())

const database = {
	users: [
	{
		id: '123',
		firstname: 'Adhavan',
		lastname: 'T',
		email: 'adhavan02@gmail.com',
		password: 'adhavan07',
		entries: 0,
		joined: new Date()

	},
	{
		id: '124',
		firstname: 'John Sam',
		lastname: 'Daniel',
		email: "johnsam@gmail.com",
		password: 'john07',
		entries: 0,
		joined: new Date()	
	}
  ]
}

app.get('/',(req,res) =>{
	res.send(database.users);
})

app.post('/signin',(req,res) => {
	if(req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password){
		res.json('success')
	}else{
		res.status(404).json('error loggging In');
	} 
})


app.post('/register',(req,res) =>{
	const {firstname,lastname,email,password} = req.body;
	db('users').insert({
		firstname: firstname,
		lastname:lastname,
		email: email,
		joined: new Date()
	}).then(console.log)
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res) => {
	 const { id } = req.params;
  	 db.select('*').from('users').where({id})
	    .then(user => {
	      if (user.length) {
	        res.json(user[0])
	      } else {
	        res.status(400).json('Not found')
	      }
	    })
	    .catch(err => res.status(400).json('error getting user'))
	// const{id} = req.params;
	// // let found = false;
	
	// db.select('*').form('users').where({id})
	// 	.then(user => {
	// 	  if(user.id === id){
	// 	    // found = true;
	// 		return res.json(user);
	// 	}
	// })
	// if(!found){
	// 	res.status(404).json("no user founded")
	// }
	
})

app.post('/image',(req,res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries)
		}
	})
	if(!found){
		res.status(404).json("No user founded")
	}
})



app.listen(3000,() => {
	console.log("server running succesfully on port 3000")
})


/*
/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image -->PUT --user
*/