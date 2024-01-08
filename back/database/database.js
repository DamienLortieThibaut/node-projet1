const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodeipssiprojet', 'root', '', {
    port: 3307,
    host: 'localhost',
    dialect: 'mariadb'
});

sequelize.authenticate().then(() => {
    console.log('Authentification successful');
}).catch((err) => {
    console.log(err);
})

module.exports = sequelize
