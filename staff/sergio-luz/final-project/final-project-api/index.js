require('dotenv').config()

const express = require('express')
const router = require('./routes')
const cors = require('./utils/cors')
const package = require('./package.json')
const { Sequelize, models: { User, Offer, Searching, Blocked } } = require('final-data')

const { env: { PORT, DATABASE_URL, DATABASE_NAME } } = process

const sequelize = new Sequelize(DATABASE_URL)

sequelize
    .authenticate({ logging: false })
    .then(() => {
        console.log('Connection has been established successfully at port ' + PORT)

        const app = express()

        app.use(cors)

        app.use('/api', router)

        // sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
        //     console.log('// Tables in database','==========================');
        //     console.log(tableObj);
        // })
        // debugger

        return app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))

    })



    // .then(()=>{

    //     return sequelize.query(`DROP DATABASE ${DATABASE_NAME}`, { logging: false })
    //         .catch(() => undefined)
    //         .finally(() => {
    //             console.log('Database dropped')

    //             return sequelize.query(`CREATE DATABASE ${DATABASE_NAME}`, { logging: false })
    //         })
    //         .then(res => { })
    // })
    .catch(err => {
        console.error(`Unable to connect to the database: ${DATABASE_NAME}`);
    })
    // .then(() => sequelize.query("SET FOREIGN_KEY_CHECKS = 0"))
    // .then(() => Searching.sync())
    // .then(() => Offer.sync({ force: !false, logging: false }))
    // .then(() => User.sync({ force: !false, logging: false }))
    // .then(() => Blocked.sync({ force: !false, logging: false }))
    // .then(() => sequelize.query("SET FOREIGN_KEY_CHECKS = 1"))
    // .catch(err => {
    //     console.error('Unable to connect to the database:', err);
    // })
    // .then(() => {
    //     // const app = express()

    // })



// mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
//     .then(() => {
//         console.log(`db server running at ${MONGO_URL}`)

//         const { argv: [, , port = PORT || 8080] } = process

//         const app = express()

//         app.use(cors)

//         app.use('/api', router)

//         app.use(multer({ dest: './uploads/' }).any());


//         app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))
//     })
//     .catch(console.error)