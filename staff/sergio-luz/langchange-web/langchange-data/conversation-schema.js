const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')



const Conversation = sequelize.define('conversation', {
    user1_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    user2_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})


module.exports = {
    Conversation
}