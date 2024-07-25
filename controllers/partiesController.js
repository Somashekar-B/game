const { where, QueryTypes } = require('sequelize');
const { Party, Parties, sequelize } = require('../models/associations');

const createParty = async (req, res) => {
    try {

        const userId = req.body.userId;
        const partyName = req.body.partyName;
        const startTime = req.body.startTime;
        const result = Party.create({
            party_name: partyName,
            leader_id: userId,
            start_time: startTime
        });
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const invitePeople = async (req, res) => {
    try {
        const users = req.body.usersToInvite;
        const partyId = req.body.partyId;
        users.forEach(async user => {
            const partyInvited = await Parties.findOne({
                where: {
                    party_id: partyId,
                    user_id: user
                }
            });
            if (partyInvited) {
                await Parties.update({
                    where: {
                        party_id: partyId,
                        user_id: user,
                        status: "Pending"
                    }
                });
            } else {
                await Parties.create({
                    party_id: partyId,
                    user_id: user
                })
            }
        });
        res.status(200).json({ message: "People are invited to Party" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateParty = async (req, res) => {
    try {
        const userId = req.body.userId;
        const status = req.body.status;
        const partyId = req.body.partyId;

        const [result] = Parties.update(
            {
                status: status
            }, {
            where: {
                party_id: partyId,
                user_id: userId
            }
        });
        if (result) {
            res.status(200).json({ message: "Party invite status updated" });
        } else {
            res.status(200).json({ message: "Party invite didn't found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMyPartyInvites = async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = `SELECT party_id, party_name, start_time, leader_id 
                       FROM Party 
                       WHERE status = 'Active' AND party_id IN 
                       (SELECT party_id FROM Parties WHERE user_id = :userId AND status IN ('Pending', 'Left'))`
        const [result, metadata] = await sequelize.query(query, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const endParty = async (req, res) => {
    try {
        const userId = req.body.userId;
        const partyId = req.body.partyId;

        const [result] = await Party.update({
            status: 'Ended'
        }, {
            where: {
                party_id: partyId,
                leader_id: userId
            }
        });
        res.staus(200).json({ message: "Party Ended Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const peopleInParty = async (req, res) => {
    try {
        const partyId = req.params.partyId;
        const query = `
            SELECT id, username FROM Users WHERE id IN 
                (SELECT user_id as id FROM Parties as pu JOIN Party as p ON pu.party_id = p.party_id WHERE party_id = :partyId AND pu.status = 'Accepted' AND p.status = 'Active')
        `;
        const [result, metadata] = sequelize.query(query, {
            replacements: { partyId },
            type: QueryTypes.SELECT
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createParty, invitePeople, updateParty, getMyPartyInvites, endParty, peopleInParty };