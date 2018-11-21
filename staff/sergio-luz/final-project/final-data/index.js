
const { User } = require('./user-schema')
const { Offer } = require('./offer-schema')
const { Searching } = require('./searching-schema')
const { Blocked } = require('./blocked-schema')

const Sequelize = require('sequelize');

// const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')

// User.hasMany(Offer, { onDelete: 'CASCADE' })
// User.hasMany(Searching, { onDelete: 'CASCADE' })



// const UserOffer = sequelize.define('userOffer', {});

// User.belongsToMany(Offer, { through: UserOffer });
// Offer.belongsToMany(User, { through: UserOffer });

User.hasMany(Offer, {
    foreignKey: 'user_id',
    as: 'userOffers',
});

Offer.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Searching, {
    foreignKey: 'user_id',
    as: 'userSearchings',
});

Searching.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
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