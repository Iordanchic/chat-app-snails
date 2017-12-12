var mongoose = require ('mongoose'),
    Schema = mongoose.Schema;

/* UserSchema*/

var UserSchema = new Schema({
    fullName:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: true
    }
})
// UserSchema.methods.comparedPassword = function (password) {
//
// }