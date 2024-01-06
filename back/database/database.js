const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodeipssiprojet', 'root', '', {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Authentification réussi');
}).catch((err) => {
    console.log(err);
})

module.exports = sequelize
