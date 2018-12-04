
const { User } = require('./user-schema')
const { Offer } = require('./offer-schema')
const { Searching } = require('./searching-schema')
const { Blocked } = require('./blocked-schema')
const { Message } = require('./message-schema')
const { Conversation } = require('./conversation-schema')

const Sequelize = require('sequelize');


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
});

Message.belongsTo(User, {
    as: 'receiver',
    foreignKey: 'receiver_id',
    constraints: false,
})

Conversation.belongsTo(User, {
    foreignKey: 'user1_id',
    constraints: false,
});

Conversation.belongsTo(User, {
    foreignKey: 'user2_id',
    constraints: false,
})



module.exports = {
    Sequelize,
    models: {
        User,
        Offer,
        Searching,
        Blocked,
        Message,
        Conversation
    }
}