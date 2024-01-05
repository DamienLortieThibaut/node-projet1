const express = require('express');
const router = express.Router();


//----------------  Routes  ------------------//
const userRoute = require('./routes/userRoute');
const toolRoute = require('./routes/toolRoute');
const modelRoute = require('./routes/modelRoute');
const buyRoute = require('./routes/buyRoute');
const databaseRoute = require('./routes/databaseRoute');

//---------------- Export ----------------//
app.use('/user', userRoute);
app.use('/tool', toolRoute);
app.use('/model', modelRoute);
app.use('/buy', buyRoute);
app.use('/database', databaseRoute);

module.exports = router;