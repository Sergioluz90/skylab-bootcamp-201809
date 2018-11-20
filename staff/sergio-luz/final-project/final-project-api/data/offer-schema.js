const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')



const Offer = sequelize.define('offer', {
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lenguage:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = {
    Offer
}