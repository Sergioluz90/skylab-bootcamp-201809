const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')
const Busboy = require('busboy')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process


router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {

        const { name, username, city, email, password } = req.body

        return logic.registerUser(name, username, password, email, city)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
            .catch((err) => {
                res.status(409)

                res.json({
                    error: `${err.message} `
                })
            })
    }, res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    debugger
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {

    routeHandler(() => {
        const { params: { id }, sub, body: { name, email, username, newPassword, password } } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.updateUser(id, name ? name : null, username ? username : null, email ? email : null, newPassword ? newPassword : null, password)
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})

router.get('/users/:id/profile', [bearerTokenParser, jwtVerifier], (req, res) => {

    routeHandler(() => {
        const { params: { id }, sub } = req

        // if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.retrieveProfile(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.patch('/users/:id/profile', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { name, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching } } = req

        debugger
        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.updateProfile(id,
            (name != null) ? name : null,
            (email != null) ? email : null,
            (skype != null) ? skype : null,
            (age != null) ? age : null,
            (gender != null) ? gender : null,
            (height != null) ? height : null,
            (weight != null) ? weight : null,
            (smoker != null) ? smoker : null,
            (description != null) ? description : null,
            (receives != null) ? receives : null,
            (moves != null) ? moves : null,
            (city != null) ? city : null,
            (offer != null) ? offer : null,
            (searching != null) ? searching : null)
            .then(() => {

                res.json({
                    message: 'profile updated'
                })
            }
            ).catch((err) => {

                res.json({

                    error: `${err} `
                })
            })

    }, res)
})

router.get('/users/:id/search/:query', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id, query }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.search(query, sub)
            .then((info) => {

                res.json({
                    data: info
                })
            }
            ).catch((err) => {

                res.json({

                    error: `${err} `
                })
            })

    }, res)
})

router.post('/users/:id/profile/image', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        debugger

        return new Promise(async (resolve, reject) => {
            const busboy = new Busboy({ headers: req.headers })


            await busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                debugger

                logic.insertProfileImage(file, id)
                    .then(() => {
                        resolve()
                    })

            })

            busboy.on('finish', () => {

                debugger
                // resolve()

            })

            busboy.on('error', err => reject(err))

            req.pipe(busboy)

        })
            .then(() => res.json({
                message: 'photo uploaded'
            }))
    }, res)
})

router.delete('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {

    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.deleteAccount(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.post('/users/:id/messages/:receiver_id', [bearerTokenParser, jwtVerifier], (req, res) => {

    routeHandler(() => {
        const { params: { id, receiver_id }, sub, body: { text } } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.sendMessage(id, receiver_id, text)
            .then(() =>
                res.json({
                    message: 'message sent'
                })
            )
    }, res)
})

router.get('/users/:id/messages/:receiver_id', [bearerTokenParser, jwtVerifier], (req, res) => {

    routeHandler(() => {
        const { params: { id, receiver_id }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.listChats(id, receiver_id)
            .then(list =>
                res.json({
                    message: list
                })
            )
    }, res)
})

router.get('/users/:id/conversations', [bearerTokenParser, jwtVerifier], (req, res) => {

    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

        return logic.listConversations(id)
            .then(list =>
                res.json({
                    message: list
                })
            )
    }, res)
})


module.exports = router