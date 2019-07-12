const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings

// Setting for app deployment (Toma el puerto asignado por el servicio, o el puerto por defecto)
app.set('port', process.env.PORT || 3000);

// Middelwares
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/api/cast_members' ,require('./routes/cast.routes'));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Starting Server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});