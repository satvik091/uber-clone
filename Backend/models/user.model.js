const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, 'FirstName is required'],
            minlength: [3, 'FirstName must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'LastName must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minlength: [5, 'Email must be at least 5characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    soketId: {
        type: String
    },

})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 12);
}

const userModel = mongoose.model('User', userSchema);


module.exports = userModel;
