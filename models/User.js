const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
// const bcrypt   = require('bcrypt-nodejs');

const userSchema = new Schema({
    local: {
        username: String,
        email: String,
        password: String,
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    google: {
        id: String,
        email: String,
        name: String,
        firstname: String,
        lastname: String,
        picture: String,
        admin: {
            type: Boolean,
            default: false
        }
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

// User.plugin(passportLocalMongoose);

mongoose.model('users', userSchema);