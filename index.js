const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/associations');
const { friendsRouter } = require('./routes/friendsRoutes');
const { partiesRouter } = require('./routes/partiesRoutes');
const { userRouter } = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("DB Synced Successfully");
    app.listen(PORT, async () => {
        console.log(`Server is running on PORT ${PORT}`);
        try {
            await sequelize.authenticate();
            console.log("Database Connection SuccessFull");
        } catch (error) {
            console.log('Unable to connect to Database : ', error);
        }
    })
}).catch(err => {
    console.log("DB Sync Failed with error ", err);
});

app.use('/user', userRouter);
app.use('/party', partiesRouter);
app.use('/friends', friendsRouter);

module.exports = { app };



