const express = require('express');
const app = express();

// Settings

// Setting for app deployment (Toma el puerto asignado por el servicio, o el puerto por defecto)
app.set('port', process.env.PORT || 3000);

// Middelwares

// Routes

// Static Files

//Starting Server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});