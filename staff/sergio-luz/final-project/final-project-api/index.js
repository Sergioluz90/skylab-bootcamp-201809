require('dotenv').config()

const express = require('express')
const router = require('./routes')
const cors = require('./utils/cors')
const package = require('./package.json')
const {Sequelize, models:{ User, Offer, Searching, Blocked }} = require('final-data')

const { env: { PORT, DATABASE_URL } } = process

const sequelize = new Sequelize(DATABASE_URL, )

sequelize
    .authenticate()
    .then(() => {
        const { argv: [, , port = PORT || 3306] } = process

        const app = express()

        app.use(cors)

        app.use('/api', router)

        app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))
    })
    .then(()=>User.sync({ force: false, logging:false }))
    .then(()=>Offer.sync({ force: false, logging:false }))
    .then(()=>Searching.sync({ force: false, logging:false }))
    .then(()=>Blocked.sync({ force: false, logging:false }))
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })



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