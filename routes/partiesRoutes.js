const express = require('express');
const { createParty, invitePeople, updateParty, getMyPartyInvites, endParty, peopleInParty } = require('../controllers/partiesController');

const partiesRouter = express.Router();

partiesRouter.get('/invites', getMyPartyInvites);
partiesRouter.post('/', createParty);
partiesRouter.put('/', updateParty);
partiesRouter.delete('/', endParty);
partiesRouter.get('/people', peopleInParty);
partiesRouter.post('/invites', invitePeople);

module.exports = { partiesRouter };