const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
    fname: {
        type: String,
        // required: true
    },
    lname: {
        type: String,
        // required: true
    },
    course: {
        type: String,
        // required: true
    },
    entry: {
        type: String,
        // required: true
    },
    intake: {
        type: String,
        // required: true
    },
    sponsorship: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    dob: {
        type: Date,
        // required: true
    },
    residence: {  
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('RegisterModels', registrationSchema);