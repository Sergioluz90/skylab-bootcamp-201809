const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')



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