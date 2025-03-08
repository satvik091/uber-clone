const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.log('Failed to connect to the database', err);
    });
}


module.exports = connectDB;