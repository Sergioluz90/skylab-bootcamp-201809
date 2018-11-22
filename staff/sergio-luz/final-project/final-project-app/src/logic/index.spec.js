// import {Sequelize ,models:{ User }} from 'final-data'
const { Sequelize, models: { User, Offer, Searching } } = require('final-data')
require('dotenv').config()

// import logic from './logic'
const logic = require('.')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306', { logging: false })

require('isomorphic-fetch')

global.sessionStorage = require('sessionstorage')

const { expect } = require('chai')
const { before } = require('mocha')

const flag = true

// debug -> $ mocha debug src/logic.spec.js --timeout 10000
// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000


describe('logic', () => {

    before(() =>
        sequelize
            .authenticate({ logging: false })
            .then(() => {
                console.log('Connection has been established successfully at port ' + 5000)


                return sequelize.query(`DROP DATABASE ${'test'}`, { logging: false })
                    .catch(() => undefined)
                    .finally(() => {
                        console.log('Test database dropped')

                        return sequelize.query(`CREATE DATABASE ${'test'}`, { logging: false })
                    })
                    .then(res => { })
            })
            .catch(err => {
                console.error(`Unable to connect to the database: ${'test'}`);
            })
    )

    beforeEach(async () => {
        // await User.sync({ force: true, logging: false })
        await User.destroy({ where: {}, logging: false })
        await Offer.destroy({ where: {}, logging: false })
        await Searching.destroy({ where: {}, logging: false })
    })

    describe('users', () => {
        !flag && describe('register', () => {
            let name, username, password, email

            !false && beforeEach(() => {
                name = `name-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
                email = `email-${Math.random()}`
            })

            it('should succeed on correct data', async () => {

                const res = await logic.registerUser(name, username, password, email)

                expect(res).to.be.equal(undefined)

                const _users = await User.findAll({ logging: false })

                expect(_users.length).to.equal(1)

                const [user] = _users

                expect(user.dataValues.id).to.be.a('number')
                expect(user.name).to.be.equal(name)
                expect(user.email).to.equal(email)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })


            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, username, password, email)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null name', () => {
                expect(() => logic.registerUser(null, username, password, email)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank name', () => {
                expect(() => logic.registerUser('           \n', username, password, email)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on number name', () => {
                expect(() => logic.registerUser(123, username, password, email)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean name', () => {
                expect(() => logic.registerUser(true, username, password, email)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array name', () => {
                expect(() => logic.registerUser(['true', 'false'], username, password, email)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object name', () => {
                expect(() => logic.registerUser({ o: 'bj' }, username, password, email)).to.throw(TypeError, '[object Object] is not a string')
            })


            it('should fail on undefined username', () => {
                expect(() => logic.registerUser(name, undefined, password, email)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null username', () => {
                expect(() => logic.registerUser(name, null, password, email)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank username', () => {
                expect(() => logic.registerUser(name, '           \n', password, email)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on number username', () => {
                expect(() => logic.registerUser(name, 123, password, email)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean username', () => {
                expect(() => logic.registerUser(name, true, password, email)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array username', () => {
                expect(() => logic.registerUser(name, ['true', 'false'], password, email)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object username', () => {
                expect(() => logic.registerUser(name, { o: 'bj' }, password, email)).to.throw(TypeError, '[object Object] is not a string')
            })


            it('should fail on undefined password', () => {
                expect(() => logic.registerUser(name, username, undefined, email)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null password', () => {
                expect(() => logic.registerUser(name, username, null, email)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank password', () => {
                expect(() => logic.registerUser(name, username, '           \n', email)).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on number password', () => {
                expect(() => logic.registerUser(name, username, 123, email)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean password', () => {
                expect(() => logic.registerUser(name, username, true, email)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array password', () => {
                expect(() => logic.registerUser(name, username, ['true', 'false'], email)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object password', () => {
                expect(() => logic.registerUser(name, username, { o: 'bj' }, email)).to.throw(TypeError, '[object Object] is not a string')
            })


            it('should fail on undefined email', () => {
                expect(() => logic.registerUser(name, username, password, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null email', () => {
                expect(() => logic.registerUser(name, username, password, null)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank email', () => {
                expect(() => logic.registerUser(name, username, password, '           \n')).to.throw(ValueError, 'email is empty or blank')
            })

            it('should fail on number email', () => {
                expect(() => logic.registerUser(name, username, password, 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean email', () => {
                expect(() => logic.registerUser(name, username, password, true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array email', () => {
                expect(() => logic.registerUser(name, username, password, ['true', 'false'])).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object email', () => {
                expect(() => logic.registerUser(name, username, password, { o: 'bj' })).to.throw(TypeError, '[object Object] is not a string')
            })

        })

        flag && describe('login', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save({ logging: false })
            })

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const data = await logic.loginUser(username, password)

                const {id, token}=data

                expect(id).to.exist
                expect(id).to.be.a('number')

                const users = await User.findAll({ logging: false })


                const [_user] = users

                expect(_user).not.to.be.undefined
                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.loginUser(undefined, user.password).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null username', () => {
                expect(() => logic.loginUser(null, user.password).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank username', () => {
                expect(() => logic.loginUser('      \n', user.password).to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number username', () => {
                expect(() => logic.loginUser(123, user.password).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean username', () => {
                expect(() => logic.loginUser(true, user.password).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array username', () => {
                expect(() => logic.loginUser(['true', 'false'], user.password).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object username', () => {
                expect(() => logic.loginUser({ ob: 'j' }, user.password).to.throw(TypeError, '[object Object] is not a string'))
            })


            it('should fail on undefined password', () => {
                expect(() => logic.loginUser(user.username, undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null password', () => {
                expect(() => logic.loginUser(user.username, null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank password', () => {
                expect(() => logic.loginUser(user.username, '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number password', () => {
                expect(() => logic.loginUser(user.username, 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean password', () => {
                expect(() => logic.loginUser(user.username, true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array password', () => {
                expect(() => logic.loginUser(user.username, ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object password', () => {
                expect(() => logic.loginUser(user.username, { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

            // TODO other test cases
        })
    })

    after(()=>process.exit)
})