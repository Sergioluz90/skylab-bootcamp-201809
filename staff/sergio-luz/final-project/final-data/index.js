
const { User } = require('./user-schema')
const { Offer } = require('./offer-schema')
const { Searching } = require('./searching-schema')
const { Blocked } = require('./blocked-schema')

const Sequelize = require('sequelize');


User.hasMany(Offer, {
    foreignKey: 'user_id',
    constraints:false,
    as: 'userOffers',
});

Offer.belongsTo(User, {
    foreignKey: 'user_id',
    constraints:false,
    // onDelete: 'CASCADE',
});

User.hasMany(Searching, {
    foreignKey: 'user_id',
    constraints:false,
    as: 'userSearchings',
});

Searching.belongsTo(User, {
    foreignKey: 'user_id',
    constraints:false,
    // onDelete: 'CASCADE',
});



module.exports = {
    Sequelize,
    models: {
        User,
        Offer,
        Searching,
        Blocked
    }
}