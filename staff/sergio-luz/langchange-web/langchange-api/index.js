require('dotenv').config()

const express = require('express')
const router = require('./routes')
const cors = require('./utils/cors')
const package = require('./package.json')
const { Sequelize, models: { User, Offer, Searching, Blocked, Message, Conversation } } = require('final-data')

const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process

const sequelize = new Sequelize(DATABASE_URL)

sequelize
    .authenticate({ logging: false })
    .then(() => {
        console.log('DATABASE_URL='+DATABASE_URL)
        console.log('Connection has been established successfully at port ' + PORT)

        const app = express()

        app.use(cors)

        app.use('/api', router)

        return app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))

    })
    // .then(()=>{

    //     return sequelize.query(`DROP DATABASE ${DATABASE_NAME}`, { logging: false })
    //         .catch(() => undefined)
    //         .finally(() => {
    //             console.log('Database dropped')

    //             return sequelize.query(`CREATE DATABASE ${DATABASE_NAME}`, { logging: false })
    //         })
    //         .then(res => { console.log('Database created')})
    // })
    .catch(err => {
        console.error(`Unable to connect to the database: ${DATABASE_NAME}`);
    })
    // .then(() => User.sync({ force: false, logging: false }))
    // .then(() => Searching.sync({ force: false, logging: false }))
    // .then(() => Offer.sync({ force: false, logging: false }))
    // .then(() => Blocked.sync({ force: false, logging: false }))
    // .then(() => Message.sync({ force: false, logging: false }))
    // .then(() => Conversation.sync({ force: false, logging: false }))
    // .catch(err => {
    //     console.error('Unable to connect to the database:', err);
    // })
