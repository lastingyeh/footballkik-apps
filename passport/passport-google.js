const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const secret = require('../secret/secretFile');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${process.env.CALLBACK_DOMAIN}/auth/google/callback`,
			passReqToCallback: true,
		},
		async (req, accessToken, refreshToken, profile, done) => {
			try {
				const findUser = await User.findOne({ google: profile.id });

				if (findUser) {
					return done(null, findUser);
				}

				const newUser = new User();

				newUser.google = profile.id;
				newUser.fullname = profile.displayName;
				newUser.username = profile.displayName;
				newUser.email = profile.emails[0].value;
				newUser.userImage = profile._json.image.url;

				const savedUser = await newUser.save();

				done(null, savedUser);
			} catch (error) {
				return done(error);
			}
		},
	),
);
