
const { User } = require('./user-schema')
const { Offer } = require('./offer-schema')
const { Searching } = require('./searching-schema')
const { Blocked } = require('./blocked-schema')

const Sequelize = require('sequelize');

module.exports = {
    Sequelize,
    models:{
        User,
        Offer,
        Searching,
        Blocked
    }
}