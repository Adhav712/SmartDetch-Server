const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const saltRounds = 10;

const register = require('./controllers/register');
const SignIn = require('./controllers/SignIn');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image');

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '73994812',
    database : 'SmartDetch-db'
  }
}); 

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(database.users) })

app.post('/signin', (req,res) => {SignIn.HandleSignIn(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.HandleRegister(req, res ,bcrypt ,db ,saltRounds)})

app.get('/profile/:id', (req,res) => {Profile.HandleProfileget(req,res,db)})

app.put('/image', (req,res) => {Image.HandleImage(req,res,db)} )

app.post('/imageurl', (req,res) => {Image.HandleApiCall(req,res,)} )

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image -->PUT --user
*/






// const express = require('express');
// const cors = require('cors');
// // const e = require('express');
// const knex = require('knex');
// const bcrypt = require('bcrypt') ;
// const saltRounds = 10;


// const db = knex({
// 	client: 'pg',
// 	connection: {
// 	  host : '127.0.0.1',
// 	  user : 'postgres',
// 	  password : '73994812',
// 	  database : 'SmartDetch-db'
// 	}
//   });
 
  // db.select('*').from('users').then(data => {
	 //  console.log(data);
  // });

// db.select('*').from('users').then(data =>{
// 	console.log(data)
// });

// const app = express();



// app.use(express.json());
// app.use(cors())

// const database = {
// 	users: [
// 	{
// 		id: '123',
// 		firstname: 'Adhavan',
// 		lastname: 'T',
// 		email: 'adhavan02@gmail.com',
// 		password: 'adhavan07',
// 		entries: 0,
// 		joined: new Date()

// 	},
// 	{
// 		id: '124',
// 		firstname: 'John Sam',
// 		lastname: 'Daniel',
// 		email: "johnsam@gmail.com",
// 		password: 'john07',
// 		entries: 0,
// 		joined: new Date()	
// 	}
//   ]
// }

// app.get('/',(req,res) =>{
// 	res.send(database.users);
// })

// app.post('/signin',(req,res) => {
// 	if(req.body.email === database.users[0].email && 
// 		req.body.password === database.users[0].password){
// 		res.json('success')
// 	}else{
// 		res.status(404).json('error loggging In');
// 	} 
// })


// app.post('/register',(req,res) =>{
// 	const {firstname,lastname,email,password} = req.body;
// 	const salt = bcrypt.genSaltSync(saltRounds);
// 	const hash = bcrypt.hashSync(password,salt);
// 	db.transcation(trx => {
// 		trx.insert({
// 			hash:hash,
// 			email:email
// 		})
// 	 .into('login')
// 	 .returning('email')
// 	 .then(loginEmail => {
// 	 	return trx('users')
// 				.returning('*')
// 				.insert({
// 					firstname: firstname,
// 					lastname:lastname,
// 					email: loginEmail[0],
// 					joined: new Date()
// 			  })
// 			.then(user => {
// 				res.json(user[0]);
// 	      })
// 	 })
// 	 .then(trx.commit)
// 	 .catch(trx.rollback)
// 	})
	
// 	.catch(err => res.status(400).json('unable to register'))
// })

// app.get('/profile/:id',(req,res) => {
// 	 const { id } = req.params;
//   	 db.select('*').from('users').where({id})
// 	    .then(user => {
// 	      if (user.length) {
// 	        res.json(user[0])
// 	      } else {
// 	        res.status(400).json('Not found')
// 	      }
// 	    })
// 	    .catch(err => res.status(400).json('error getting user'))
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
	
// })

// app.post('/image',(req,res) => {
// 	const {id} = req.body;
//   db('users').where('id' , '=', id)
//     .increment('entries',1) 
//     .returning('entries')
//     .then(entries => {
//     	res.json(entries[0]);	
//     })
//     .catch(err => res.status(400).json('unable to get entries'));
// })



// app.listen(3000,() => {
// 	console.log("server running succesfully on port 3000")
// })
