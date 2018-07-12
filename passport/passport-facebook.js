const passport = require('passport');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../secret/secretFile');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FB_CLIENT_ID,
			clientSecret: process.env.FB_CLIENT_SECRET,
			profileFields: ['email', 'displayName', 'photos'],
			callbackURL: `${process.env.CALLBACK_DOMAIN}/auth/facebook/callback`,
			passReqToCallback: true,
		},
		async (req, token, refreshToken, profile, done) => {
			try {
				const findUser = await User.findOne({ facebook: profile.id });

				if (findUser) {
					return done(null, findUser);
				}

				const newUser = new User();

				newUser.facebook = profile.id;
				newUser.fullname = profile.displayName;
				newUser.username = profile.displayName;
				newUser.email = profile._json.email;
				newUser.userImage = `https://graph.facebook.com/${profile.id}/picture?type=large`;

				newUser.fbTokens.push({ token });

				const savedUser = await newUser.save();

				done(null, savedUser);
			} catch (error) {
				return done(error);
			}
		},
	),
);
