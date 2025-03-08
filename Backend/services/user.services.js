const userModel= require('../models/userModel');


module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password
}) => {
    if(!firstname || !lastname || !email || !password){
        throw new Error('All fields are required');
    }

    const user = userModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}