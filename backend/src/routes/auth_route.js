const express=require("express")
const router=express.Router()
const passport = require("passport");
const AuthCont=require('../controllers/auth_cont')
const User = require('../models/users_model'); 


router.get("/login/success",AuthCont.loginSuccess)

router.get("/login/failed",AuthCont.loginFailed)

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		
		failureRedirect: "/login/failed",
	}),

	async (req,res)=>{

		
		console.log("check email",req.user._json.email)

		try {
			const alumni = await User.findOne({ email: req.user._json.email });
			
		
			if (alumni) {
				console.log("Data Sent")
				const callbackUrl = `${process.env.REACT_URL}?email=${req.user._json.email}`

				res.redirect(callbackUrl);

			  
			} else {

			  // User does not exist
			  const err="error"
			  const callbackUrl = `${process.env.REACT_URL}?email=${err}`

			  res.redirect(callbackUrl);

			  console.log("Alumni Not Found check");
			}
		  } catch (error) {
			console.error(error);
			res.status(500).json({ message: 'err' });
		  }

        
		
	}
);



router.get("/logout",AuthCont.logout)



module.exports=router




