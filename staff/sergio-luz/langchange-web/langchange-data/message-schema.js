const Sequelize = require('sequelize');
const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process

const sequelize = new Sequelize(DATABASE_URL)



const Message = sequelize.define('message', {
    sender_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    receiver_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
    },
    createdAt: Sequelize.DATE
})


module.exports = {
    Message
}