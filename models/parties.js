const { sequelize, DataTypes } = require('../config/dbconfig');

const Parties = sequelize.define("PartyInvites", {
    party_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    user_id: {
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

module.exports = { Parties };