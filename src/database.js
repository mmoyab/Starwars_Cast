const mongoose = require('mongoose');
const URI = 'mongodb://localhost/star-wars-cast';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.export = mongoose;