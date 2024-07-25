const { sequelize, DataTypes } = require('../config/dbconfig');

const Party = sequelize.define('Party', {
    party_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    party_name: {
        type: DataTypes.STRING
    },

    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Active"
    },

    leader_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = { Party };