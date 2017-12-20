var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');


// set up a mongoose model

// module.exports = mongoose.model('User', new Schema({ 

var userSchema = mongoose.Schema({

	name: {
		type: String,
		required: true,
	}, 
	password: {
		type: String,
		required: true,
	}, 
	email: {
		type: String,
		required: true,
	},
	grups: Array, 
	admin: Boolean,
	userImg: String,
	grups:[]
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// // set up a mongoose model
// module.exports = mongoose.model('User', new Schema({ 
// 	name: String, 
// 	password: String, 
// 	admin: Boolean,
// 	userImg: String
// }));
