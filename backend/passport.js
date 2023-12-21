const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");




passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

function ensureAuthenticated(req, res, next) {
	console.log(req);
	if (req.isAuthenticated()) {
		
	  return next(); // User is authenticated, continue to the next middleware or route handler
	} else {
	  res.redirect('/login'); // User is not authenticated, redirect them to the login page
	}
  }

  module.exports=ensureAuthenticated
