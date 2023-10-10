const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			try {
				const user = await User.findOne({ email: username });
				if (!user) {
					return done(null, false, { message: 'User not found' });
				}
				const match = await bcrypt.compare(password, user.password);
				if (!match && user) {
					return done(null, false, { message: 'Invalid password' });
				}
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});
