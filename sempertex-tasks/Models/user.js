const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    document: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);
module.exports = User;