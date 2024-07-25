const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'game', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    logging: true,
    dialect: 'mysql'
});



sequelize.authenticate().then(() => {
    console.log("Database Connected Successfully");
}).catch(err => {
    console.log(err);
})
f
module.exports = { sequelize, DataTypes };
