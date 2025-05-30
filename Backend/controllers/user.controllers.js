const userModel = require('../models/user.model');
const userService = require('../services/user.services');

module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstname, lastname, email, password} = req.body;
    const hashedPassword = await userModel.hashPassword(password); 

    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();
    res.status(201).json({user, token});
}