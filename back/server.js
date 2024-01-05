express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/userRoute');
const dataBaseRoute = require("./routes/databaseRoute");
const modelRoutes = require('./routes/modelRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/database", dataBaseRoute);
app.use('/users', userRoutes);
app.use('/models', modelRoutes);

app.listen(8000, () => {
  console.log("Serveur lancé sur le port 8000");
});
