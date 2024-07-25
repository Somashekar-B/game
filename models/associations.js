const { sequelize } = require('../config/dbconfig');

const { User } = require('./user');
const { Party } = require('./party');
const { Friends } = require('./friends');
const { Parties } = require('./parties');


User.hasMany(Friends, { foreignKey: 'sender', as: 'ReceivedRequests' });
User.hasMany(Friends, { foreignKey: 'receiver', as: 'SentRequests' });
Friends.belongsTo(User, { foreignKey: 'id', as: 'Sender' });
Friends.belongsTo(User, { foreignKey: 'id', as: 'Receiver' });

Party.hasOne(User, { foreignKey: 'id', as: 'leaderId' });
User.hasMany(Party, { foreignKey: 'leader_id', as: 'party' });
Parties.hasMany(User, { foreignKey: 'id', as: 'invities' });
User.hasMany(Parties, { foreignKey: 'user_id', as: 'parties' });

module.exports = {sequelize, User, Party, Friends, Parties};
