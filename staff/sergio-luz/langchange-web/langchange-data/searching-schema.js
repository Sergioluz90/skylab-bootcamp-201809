const Sequelize = require('sequelize');
const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process

const sequelize = new Sequelize(DATABASE_URL)



const Searching = sequelize.define('searching', {
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
    Searching
}