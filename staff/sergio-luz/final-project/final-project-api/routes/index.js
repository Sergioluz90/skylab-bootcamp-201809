const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process


router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {

        const { name, username, password, email } = req.body

        return logic.registerUser(name, username, password, email)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
            .catch((err)=>{
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

        if (id !== sub.toString()) throw Error('token sub does not match user id')

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
        const { params: { id }, sub, body: { email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching } } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

            return logic.updateProfile(id,
                email ? email : null,
                skype ? skype : null,
                age ? age : null,
                gender ? gender : null,
                height ? height : null,
                weight ? weight : null,
                smoker ? smoker : null,
                description ? description : null,
                receives ? receives : null,
                moves ? moves : null,
                city ? city : null,
                offer ? offer : null,
                searching ? searching : null)
                .then(() =>{
                    
                    res.json({
                        message: 'profile updated'
                    })
                }
                ).catch((err)=>{
                    
                    res.json({
                        
                        error:`${err} `
                    })
                })
                
    }, res)
})

router.get('/users/:id/search/:query', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id, query }, sub } = req

        if (id !== sub.toString()) throw Error('token sub does not match user id')

            return logic.search(query, sub)
                .then((info) =>{
                    
                    res.json({
                        data: info
                    })
                }
                ).catch((err)=>{
                    
                    res.json({
                        
                        error:`${err} `
                    })
                })
                
    }, res)
})


module.exports = router