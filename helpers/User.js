module.exports = function(_) {
	return {
		signupValidation: (req, res, next) => {
			req.checkBody('username', 'Username is Required').notEmpty();
			req
				.checkBody('username', 'Username Must Not Be Less Than 5')
				.isLength({ min: 5 });
			req.checkBody('email', 'Email is Required').notEmpty();
			req.checkBody('email', 'Email is Invalid').isEmail();
			req.checkBody('password', 'Password is Required').notEmpty();
			req
				.checkBody('password', 'Email Must Not Be Less Than 5')
				.isLength({ min: 5 });

			req
				.getValidationResult()
				.then(result => {
					const messages = result.array().map(error => error.msg);
					req.flash('error', messages);
					res.redirect('/signup');
				})
				.catch(err => {
					return next();
				});
		},
		loginValidation: (req, res, next) => {
			req.checkBody('email', 'Email is Required').notEmpty();
			req.checkBody('email', 'Email is Invalid').isEmail();
			req.checkBody('password', 'Password is Required').notEmpty();
			req
				.checkBody('password', 'Email Must Not Be Less Than 5')
				.isLength({ min: 5 });

			req
				.getValidationResult()
				.then(result => {
					const messages = result.array().map(error => error.msg);
					req.flash('error', messages);
					res.redirect('/');
				})
				.catch(err => {
					return next();
				});
		},
	};
};
