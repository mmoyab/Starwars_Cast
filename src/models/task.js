const mongoose = require('mongoose');
const { Schema } = mongoose;

new Schema({
    first_name: {type: String, required: true },
});