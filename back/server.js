const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())

//----------------  Routes  ------------------//
const userRoute = require('./routes/userRoute');
const toolRoute = require('./routes/toolRoute');
const modelRoute = require('./routes/modelRoute');
const buyRoute = require('./routes/buyRoute');
const carOptionRoute = require('./routes/carOptionRoute')
const databaseRoute = require('./routes/databaseRoute');

//---------------- Export ----------------//
app.use('/user', userRoute);
app.use('/tool', toolRoute);
app.use('/model', modelRoute);
app.use('/buy', buyRoute);
app.use('/carOption', carOptionRoute)
app.use('/database', databaseRoute);

app.use('/Images', express.static('./Images'))

app.listen(8000, function () {
  console.log("Serveur ouvert sur le port 8000");
});
