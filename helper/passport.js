import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import passport from "passport";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			console.log(profile)
			callback(null, profile);
			
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
	console.log("serialising user" , user)
});

passport.deserializeUser((user, done) => {
	done(null, user);
	console.log("deserialising user" , user)
});