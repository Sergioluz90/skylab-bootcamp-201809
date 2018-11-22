require('dotenv').config()
require('isomorphic-fetch')
global.sessionStorage = require('sessionstorage')
const logic = require('.')
// import {Sequelize ,models:{ User }} from 'final-data'
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')
const { expect } = require('chai')
const { Sequelize, models: { User, Offer, Searching } } = require('final-data')
const { before, after } = require('mocha')

// import logic from './logic'

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306', { logging: false })

const flag = true
const withError=true

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

        !flag && describe('login', () => {
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

                const { id, token } = data

                expect(id).not.to.be.equal(undefined)
                expect(id).to.be.a('number')

                const users = await User.findAll({ logging: false })


                const [_user] = users

                expect(_user).not.to.be.equal(undefined)
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

        !flag && describe('retrieve user', () => {
            let user

            !false && beforeEach(async () => {
                const username = 'jd'

                await logic.registerUser('jd', username, '123', 'jd@')

                await logic.loginUser(username, '123')
            })

            it('should succeed on valid id', async () => {

                const _user = await logic.retrieveUser()

                expect(_user).not.to.be.instanceof(User)

                const { id, name, username, email, password } = _user

                const users = await User.findAll({ where: { username: username }, logging: false })

                expect(users.length).to.be.equal(1)
                const user = users[0]

                expect(id).not.to.be.equal(undefined)
                expect(id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(username).to.equal(user.username)
                expect(email).to.be.equal(user.email)
                expect(password).to.be.equal(undefined)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.authenticateUser(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.authenticateUser(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.authenticateUser('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.authenticateUser(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.authenticateUser(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.authenticateUser(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.authenticateUser({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })
        })

        !flag && describe('update user', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', email: 'pacus@maximus.com', password: '123' }, { logging: false })

                await user.save({ logging: false })

                await logic.loginUser(user.username, user.password)
            })

            it('should update on correct data and password', async () => {
                let { id, name, username, email, password } = user

                const newName = `${name}-${Math.random()}`
                const newEmail = `${email}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                await logic.updateUser(id.toString(), newName, newUsername, newEmail, newPassword, password)

                const users = await User.findAll({ logging: false })

                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.email).to.equal(newEmail)
                expect(_user.username).to.equal(newUsername)
                expect(_user.password).to.equal(newPassword)
            })

            it('should update on correct id, name and password (other fields null)', () => {
                const { id, name, username, email, password } = user

                const newName = `${name}-${Math.random()}`

                return logic.updateUser(id.toString(), newName, null, null, null, password)
                    .then(() => User.findAll({ logging: false }))
                    .then(users => {
                        const _user = users[0]

                        expect(_user.id).to.equal(id)

                        expect(_user.name).to.equal(newName)
                        expect(_user.email).to.equal(email)
                        expect(_user.username).to.equal(username)
                        expect(_user.password).to.equal(password)
                    })
            })

            it('should update on correct id, email and password (other fields null)', () => {
                const { id, name, username, email, password } = user

                const newEmail = `${email}-${Math.random()}`

                return logic.updateUser(id.toString(), null, null, newEmail, null, password)
                    .then(() => User.findAll({ logging: false }))
                    .then(users => {
                        const _user2 = users[0]

                        expect(_user2.id).to.equal(id)

                        expect(_user2.name).to.equal(name)
                        expect(_user2.email).to.equal(newEmail)
                        expect(_user2.username).to.equal(username)
                        expect(_user2.password).to.equal(password)
                    })
            })

            it('should update on correct id, username and password (other fields null)', () => {
                const { id, name, username, email, password } = user

                const newUsername = `${username}-${Math.random()}`

                return logic.updateUser(id.toString(), null, newUsername, null, null, password)
                    .then(() => User.findAll({ logging: false }))
                    .then(users => {
                        const _user2 = users[0]

                        expect(_user2.id).to.equal(id)

                        expect(_user2.name).to.equal(name)
                        expect(_user2.email).to.equal(email)
                        expect(_user2.username).to.equal(newUsername)
                        expect(_user2.password).to.equal(password)
                    })
            })

            it('should update on correct id, newPassword and password (other fields null)', () => {
                const { id, name, username, email, password } = user

                const newPassword = `${password}-${Math.random()}`

                return logic.updateUser(id.toString(), null, null, null, newPassword, password)
                    .then(() => User.findAll({ logging: false }))
                    .then(users => {
                        const _user2 = users[0]

                        expect(_user2.id).to.equal(id)

                        expect(_user2.name).to.equal(name)
                        expect(_user2.email).to.equal(email)
                        expect(_user2.username).to.equal(username)
                        expect(_user2.password).to.equal(newPassword)
                    })
            })

            // Wrong ID

            it('should fail on undefined id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(undefined, name, username, email, password, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(null, name, username, email, password, password)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser('       \n', name, username, email, password, password)).to.throw(ValueError, 'id is empty or blank')
            })

            it('should fail on number id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(123, name, username, email, password, password)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(true, name, username, email, password, password)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser([false, true], name, username, email, password, password)).to.throw(TypeError, 'false,true is not a string')
            })

            it('should fail on object id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser({ ob: 'j' }, name, username, email, password, password)).to.throw(TypeError, '[object Object] is not a string')
            })

            // Wrong NAME

            it('should succed on undefined name', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), undefined, username, email, password, password)
                    .then(() => expect(true).to.be.true)

            })

            it('should succed on null name', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), null, username, email, password, password)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on blank name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), '         \n', username, email, password, password)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on boolean name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), true, username, email, password, password)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on number name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), 123, username, email, password, password)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on array name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), [false, 1], username, email, password, password)).to.throw(TypeError, 'false,1 is not a string')
            })

            it('should fail on object name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), { ob: 'j' }, username, email, password, password)).to.throw(TypeError, '[object Object] is not a string')
            })

            // Wrong USERNAME

            it('should succed on undefined username', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), name, undefined, email, password, password)
                    .then(() => expect(true).to.be.true)

            })

            it('should succed on null username', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), name, null, email, password, password)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on blank name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, '         \n', email, password, password)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on boolean username', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, true, email, password, password)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on number username', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, 123, email, password, password)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on array username', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, [false, 1], email, password, password)).to.throw(TypeError, 'false,1 is not a string')
            })

            it('should fail on object username', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, { ob: 'j' }, email, password, password)).to.throw(TypeError, '[object Object] is not a string')
            })

            // Wrong EMAIL

            it('should succed on undefined email', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), name, username, undefined, password, password)
                    .then(() => expect(true).to.be.true)

            })

            it('should succed on null email', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), name, username, null, password, password)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on blank email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, '         \n', password, password)).to.throw(ValueError, 'email is empty or blank')
            })

            it('should fail on boolean email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, true, password, password)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on number email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, 123, password, password)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on array email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, [false, 1], password, password)).to.throw(TypeError, 'false,1 is not a string')
            })

            it('should fail on object email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, { ob: 'j' }, password, password)).to.throw(TypeError, '[object Object] is not a string')
            })

            // Wrong NEWPASSWORD

            it('should succed on undefined newPassword', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), name, username, email, undefined, password, password)
                    .then(() => expect(true).to.be.true)

            })

            it('should succed on null newPassword', () => {
                const { id, name, email, username, password } = user

                logic.updateUser(id.toString(), name, username, email, null, password)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on blank newPassword', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, '         \n', password)).to.throw(ValueError, 'newPassword is empty or blank')
            })

            it('should fail on boolean newPassword', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, true, password)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on number newPassword', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, 123, password)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on array newPassword', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, [false, 1], password)).to.throw(TypeError, 'false,1 is not a string')
            })

            it('should fail on object newPassword', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, { ob: 'j' }, password)).to.throw(TypeError, '[object Object] is not a string')
            })

            // Wrong PASSWORD

            it('should fail on undefined password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, null)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, '       \n')).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on number password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, [false, true])).to.throw(TypeError, 'false,true is not a string')
            })

            it('should fail on object password', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(id.toString(), name, username, email, password, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a string')
            })


            !withError && describe('with existing user', () => {
                let user2

                !false && beforeEach(async () => {

                    user2 = User.build({ name: 'John', username: 'jd2', email: 'pacus@', password: '123' })

                    await user2.save({ logging: false })
                })

                it('should update on correct data and password',  () => {
                    const { id, name, username, email, password } = user2

                    const newUsername = `jd-${Math.random()}`

                    expect(() => logic.updateUser(id.toString(), name, username, email, password, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a string')

                    debugger

                    // await logic.updateUser(id.toString(), null, newUsername, null, null, password)

                    // expect(() => logic.updateUser(id.toString(), null, newUsername, null, null, password)).to.throw(Error)

                    expect(() => {
                        debugger
                        logic.updateUser(id.toString(), null, username, null, null, password)}).to.throw(TypeError, '[object Object] is not a string')

                    debugger
                    // const _user = await User.findByPk(id)

                    debugger

                    // expect(_user.id).to.equal(id)

                    // expect(_user.name).to.equal(name)
                    // expect(_user.email).to.equal(email)
                    // expect(_user.username).to.equal(username)
                    // expect(_user.password).to.equal(password)



                })
            })
        })

        // MUY POSIBLEMENTE EL ERROR SEA DE jwt

        flag && describe('retrieve profile', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user.save({ logging: false })

                await logic.loginUser(user.username, user.password)
            })

            it('should succeed on valid id', async () => {
                const ID=user.id.toString()
                
                const _user = await logic.retrieveProfile(ID)
                const offers = await Offer.findAll({ where: { user_id: user.id }, logging: false })
                const searchings = await Searching.findAll({ where: { user_id: user.id }, logging: false })

                expect(_user).to.not.equal(undefined)
                expect(_user).not.to.be.instanceof(User)

                expect(_user.id).to.equal(user.id)

                expect(_user.name).to.equal(user.name)
                expect(_user.email).to.equal(user.email)
                expect(_user.username).to.equal(user.username)

                expect(_user.skype).to.equal(user.skype)
                expect(_user.age).to.equal(user.age)
                expect(_user.gender).to.equal(user.gender)
                expect(_user.height).to.equal(user.height)
                expect(_user.weight).to.equal(user.weight)
                expect(_user.smoker).to.equal(user.smoker)
                expect(_user.description).to.equal(user.description)
                expect(_user.receives).to.equal(user.receives)
                expect(_user.moves).to.equal(user.moves)
                expect(_user.city).to.equal(user.city)

                expect(_user.offer[0]).to.equal(undefined)
                expect(_user.offer[0]).to.be.equal(offers[0])

                expect(_user.searching[0]).to.equal(undefined)
                expect(_user.searching[0]).to.be.equal(searchings[0])

            })
        })
      
    })
    after(() => sequelize.close().then(process.exit))
})