const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')



const Blocked = sequelize.define('blocked', {
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    blocked_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


module.exports = {
    Blocked
}