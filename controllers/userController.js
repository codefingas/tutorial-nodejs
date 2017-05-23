const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
	res.render('login', {title:'Login'})
};

exports.registerForm = (req, res) => {
	res.render('register', {title : 'Register'})
};

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'you must supply a name').notEmpty();
	req.checkBody('email', 'you must supply a email').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extention :false,
		gmail_remove_subaddress : false
	});
	req.checkBody('password', 'password can\'t be blanck').notEmpty();
	req.checkBody('password-confirm', 'password-confirm can\'t be blanck').notEmpty();
	req.checkBody('password-confirm', 'your passwords do not match').equals(req.body.password);

	const errors = req.validationErrors();
	if(errors){
		req.flash('error', errors.map(err => err.msg));
		res.render('register', {title : 'Register', body:req.body, flashes:req.flash() });
		return;
	}
	next();
};