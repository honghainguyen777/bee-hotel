const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// const bcrypt   = require('bcrypt-nodejs');

const userSchema = new Schema({
    local: {
        username: String,
        email: String,
        password: String,
        firstname: String,
        lastname: String,
        admin: Boolean
    },
    google: {
        id: String,
        email: String,
        name: String,
        firstname: String,
        lastname: String,
        picture: String,
        admin: Boolean
    }
});

// // generate a hash
// User.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // check if password is valid
// User.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);