const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')



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
        allowNull: false
    },
    skype: {
        type: Sequelize.STRING,
        defaultValue: 'not defined'
    },
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    age: {
        type: Sequelize.INTEGER
    },
    gender: {
        type: Sequelize.STRING,
        defaultValue: 'not defined'
    },
    height: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    },
    smoker: {
        type: Sequelize.BOOLEAN
    },
    description: {
        type: Sequelize.STRING
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
        defaultValue: 'not defined'
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