const mongoose = require('mongoose');
const { Schema } = mongoose;

const Contestant = new Schema({
    first_name: {type: String, required:true },
    last_name: {type: String, required:true},
    dob: { type: Date, required:true},
    phoneNumber: { type: Number, required:true},
    countryResidency: {type: String, required:true},
    email: { type:String, required:true}
});