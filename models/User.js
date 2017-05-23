const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('password-local-manager');

const userSchema = new Schema({
	email : {
		type : String,
		/*verifie someone don't have multiple account*/
		unique : true,
		lowercase : true,
		trim : true,
		validate : [validator.isEmail, 'Sorry your adress is not valid'],
		required : 'Please Supply an email adress'
	},
	name : {
		type: String,
		required: 'Please supply a name',
		trim: true
	}
});

userSchema.plugin(passportLocalMongoose, {usernameField : 'email'});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema)