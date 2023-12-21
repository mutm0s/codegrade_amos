require("dotenv").config();
const express=require('express')
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const bodyParser=require('body-parser')
const { DbConnect} = require('./DbCon');
const AuthRoute=require('./src/routes/auth_route')
const UsersRoute=require('./src/routes/users_route')
const OurEventRoute=require('./src/routes/events_route')
const MyEvent=require('./src/routes/myevents_route')

const app=express()

app.set("trust proxy", 1);

app.use(bodyParser.urlencoded({extended: false }))

app.use(bodyParser.json())

app.use(
	cookieSession({
	  name: "session",
	  keys: ["cyberwolve"],
	  maxAge: 365 * 24 * 60 * 60 * 1000, // Set to one year in milliseconds
	})
  );
  

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: [process.env.REACTT_URL],
		methods:  ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', 'https://front-end-alumni.vercel.app');
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	next();
//   });

app.use("/auth",AuthRoute);
app.use("/api/v1",UsersRoute);
app.use("/api/v1",OurEventRoute);
app.use("/api/v1",MyEvent);

app.get('/',(req,res)=>{

    res.send('<h1>Amos</h1>')
})

app.get('/api/status', (req, res) => {
	res.status(200).json('Server Wake Up');
  });

const PORT=process.env.PORT||5000

DbConnect()

app.listen(PORT,()=>{

    console.log(`The Server is running at port ${PORT}`);
})


