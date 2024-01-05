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
const getRoute = require('./routes/getRoute')
const databaseRoute = require('./routes/databaseRoute');

//---------------- Export ----------------//
app.use('/user', userRoute);
app.use('/tool', toolRoute);
app.use('/model', modelRoute);
app.use('/buy', buyRoute);
app.use('/get', getRoute)
app.use('/database', databaseRoute);

app.listen(8000, function () {
  console.log("Serveur ouvert sur le port 8000");
});
