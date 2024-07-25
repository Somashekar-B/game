const express = require('express');
const { getUnknownUsers, addFriendRequest, updateFriendRequest, getFriendRequests, getFriends } = require('../controllers/friendsController');

const friendsRouter = express.Router();

friendsRouter.get('/users', getUnknownUsers);
friendsRouter.get('/requests', getFriendRequests);
friendsRouter.get('/', getFriends);
friendsRouter.post('/requests', addFriendRequest);
friendsRouter.put('/requests', updateFriendRequest);

module.exports = { friendsRouter };