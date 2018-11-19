require('dotenv').config()

const express = require('express')
const router = require('./routes')
const cors = require('./utils/cors')
// const { User } = require('./data')
const Sequelize = require('sequelize');
const { env: { PORT, DATABASE_URL } } = process

const sequelize = new Sequelize(DATABASE_URL)

sequelize
    .authenticate()
    .then(() => {
        const { argv: [, , port = PORT || 3306] } = process
        console.log('Connection has been established successfully at port '+PORT)

        const app = express()

        app.use(cors)

        app.use('/api', router)
    })
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