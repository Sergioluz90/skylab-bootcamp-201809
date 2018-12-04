const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')



const UserMessage = sequelize.define('userMessage', {})


module.exports = {
    UserMessage
}