const { QueryTypes } = require('sequelize');
const { Friends, sequelize } = require('../models/associations');


const getUnknownUsers = async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `
            SELECT id, username FROM Users 
            WHERE id NOT IN (
                SELECT sender as id FROM Friends WHERE receiver = :userId 
                UNION 
                SELECT receiver as id FROM Friends WHERE sender = :userId 
            )`;
        const [results, metadata] = await sequelize.query(query, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });

        res.status(200).json(results);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addFriendRequest = async (req, res) => {
    try {
        const from = req.body.sender;
        const to = req.body.receiver;
        const result = await Friends.create({
            sender: from,
            receiver: to
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFriendRequests = async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = `SELECT * FROM Users WHERE id IN (SELECT sender FROM Friends WHERE receiver = :userId AND status = 'Pending')`;
        const [results, metadata] = await sequelize.query(query, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateFriendRequest = async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendId = req.body.friendId;
        const status = req.body.status;

        if (status === 'Accept') {
            const [updated] = await Friends.update({
                status: status
            }, {
                where: {
                    sender: friendId,
                    receiver: userId
                }
            });
            if (updated) {
                res.status(200).json({ message: "Friend Request Updated Successfully" });
            } else {
                res.status(200).json({ message: "Friend Request Updation Failed" });
            }
        } else {
            deleteFriendRequest(userId, friendId);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFriends = async (req, res) => {
    try {
        const userId = req.params.id;
        const query = `
            SELECT id, username FROM Users 
            WHERE id IN (
                SELECT sender as id FROM Friends WHERE receiver = :userId AND status = 'Accepted'
                UNION 
                SELECT receiver as id FROM Friends WHERE sender = :userId AND status = 'Accepted'
            )`;
        const [results, metadata] = await sequelize.query(query, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function deleteFriendRequest(userId, friendId) {
    const query = `DELETE FROM Friends WHERE (sender = :friendId AND receiver = :userId) OR (sender = :userId AND receiver = :friendId)`;
    const [result] = sequelize.query(query, {
        replacements: { userId, friendId },
        type: QueryTypes.DELETE
    });
    if (result) {
        res.status(200).json({ message: "Friend Request Deleted Successfully" });
    } else {
        res.status(200).json({ message: "Friend Request Deletion Failed" });
    }
}

module.exports = { getUnknownUsers, addFriendRequest, updateFriendRequest, getFriendRequests, getFriends };