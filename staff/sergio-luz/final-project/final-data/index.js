
const { User } = require('./user-schema')
const { Offer } = require('./offer-schema')
const { Searching } = require('./searching-schema')
const { Blocked } = require('./blocked-schema')

const Sequelize = require('sequelize');

User.hasMany(Offer, { foreignKey: 'user_id' })
User.hasMany(Searching, { foreignKey: 'user_id' })

User.belongsToMany(Offer, {through: 'user_id'})
User.belongsToMany(Searching, {through: 'user_id'})

module.exports = {
    Sequelize,
    models:{
        User,
        Offer,
        Searching,
        Blocked
    }
}