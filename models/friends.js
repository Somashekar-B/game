const { sequelize, DataTypes } = require('../config/dbconfig');

const Friends = sequelize.define('Friends', {
    sender: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    receiver: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'last_updated'
});

module.exports = { Friends };