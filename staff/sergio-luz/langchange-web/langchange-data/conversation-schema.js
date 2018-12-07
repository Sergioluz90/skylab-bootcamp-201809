const Sequelize = require('sequelize');
const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process

const sequelize = new Sequelize(DATABASE_URL)



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