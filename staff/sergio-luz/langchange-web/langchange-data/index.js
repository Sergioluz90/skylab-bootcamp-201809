
const { User } = require('./user-schema')
const { Offer } = require('./offer-schema')
const { Searching } = require('./searching-schema')
const { Message } = require('./message-schema')
const { Conversation } = require('./conversation-schema')

const Sequelize = require('sequelize');
const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process
const sequelize = new Sequelize(DATABASE_URL)


User.hasMany(Offer, {
    foreignKey: 'user_id',
    constraints: false,
    as: 'userOffers',
});

Offer.belongsTo(User, {
    foreignKey: 'user_id',
    constraints: false,
    onDelete: 'CASCADE',
});

User.hasMany(Searching, {
    foreignKey: 'user_id',
    constraints: false,
    as: 'userSearchings',
});

Searching.belongsTo(User, {
    foreignKey: 'user_id',
    constraints: false,
    onDelete: 'CASCADE',
});

Message.belongsTo(User, {
    as: 'sender',
    foreignKey: 'sender_id',
    constraints: false,
    onDelete: 'CASCADE',
});

Message.belongsTo(User, {
    as: 'receiver',
    foreignKey: 'receiver_id',
    constraints: false,
    onDelete: 'CASCADE',
})

Conversation.belongsTo(User, {
    foreignKey: 'user1_id',
    constraints: false,
    onDelete: 'CASCADE',
});

Conversation.belongsTo(User, {
    foreignKey: 'user2_id',
    constraints: false,
    onDelete: 'CASCADE',
})



module.exports = {
    sequelize,
    Sequelize,
    models: {
        User,
        Offer,
        Searching,
        Message,
        Conversation
    }
}