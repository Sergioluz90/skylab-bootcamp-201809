const Sequelize = require('sequelize');

const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process

const sequelize = new Sequelize(DATABASE_URL)



const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isUnique: true
    },
    skype: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    age: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    gender: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    height: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    weight: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    smoker: {
        type: Sequelize.BOOLEAN,
        defaultValue: null
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    receives: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    moves: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    profileImage:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    connection: {
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn('NOW')
    },
    visits: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})


module.exports = {
    User
}