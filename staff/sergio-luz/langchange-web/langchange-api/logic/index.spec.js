require('dotenv').config()
"use strict"


const { expect } = require('chai')
const { Sequelize, models: { User, Offer, Searching, Message, Conversation } } = require('final-data')
const logic = require('../logic')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')


// const { env: { PORT, TEST_DATABASE_URL, TEST_DATABASE_NAME } } = process
const TEST_DATABASE_URL = 'mysql://root:26081990@localhost:3306/test'
const TEST_DATABASE_NAME = 'test'
const PORT = 5000
const { argv: [, , port = PORT || 3306] } = process

/**
 * Flags for testing USER
 */
const _register = !false
const _login = !false
const _ret_user = !false
const _up_user = !false
const _ret_profile = !false
const _up_profile = !false
const _search = !false
const _del_account = !false

const _send_message = !false
const _ret_messages = !false
const _list_conversations = !false
const _check_conversations = !false

/**
 * Flags for testing CONVERSATIONS
 */
const sequelize = new Sequelize(TEST_DATABASE_URL)



describe('logic', () => {

    /**
     * Before start tests prepare Sequelize and the database
     */
    before(() =>
        sequelize.authenticate({ logging: false })
            .then(() => {

                console.log('Connection has been established successfully at port ' + PORT)

                return sequelize.query(`DROP DATABASE ${TEST_DATABASE_NAME}`)
                    .catch(() => undefined)
                    .finally(() => {
                        console.log('Test database dropped')

                        return sequelize.query(`CREATE DATABASE ${TEST_DATABASE_NAME}`)
                    })
                    .then(async () => {
                        await User.sync({ force: !true, logging: false })
                        await Offer.sync({ force: !true, logging: false })
                        await Searching.sync({ force: !true, logging: false })
                        await Message.sync({ force: !true, logging: false })
                        await Conversation.sync({ force: !true, logging: false })
                    })
            })
            .catch(err => {
                console.error(`Unable to connect to the database: ${TEST_DATABASE_NAME}`);
            })
    )

    /**
     * Before each test in User destroy al the data in database
     */
    beforeEach(async () => {

        await User.destroy({ where: {}, logging: false })
        await Offer.destroy({ where: {}, logging: false })
        await Searching.destroy({ where: {}, logging: false })
        await Message.destroy({ where: {}, logging: false })
        await Conversation.destroy({ where: {}, logging: false })
    })


    /**
     * All the test for 'User' model
     */
    describe('user', () => {


        _register && describe('register', () => {
            let name, username, password, email, city

            !false && beforeEach(() => {
                name = `name-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
                email = `email-${Math.random()}@gmail.com`
                city = `city-${Math.random()}`
            })

            it('should succeed on correct data', async () => {

                const res = await logic.registerUser(name, username, password, email, city)

                expect(res).to.be.undefined

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
                expect(() => logic.registerUser(undefined, username, password, email, city)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null name', () => {
                expect(() => logic.registerUser(null, username, password, email, city)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank name', () => {
                expect(() => logic.registerUser('           \n', username, password, email, city)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on number name', () => {
                expect(() => logic.registerUser(123, username, password, email, city)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean name', () => {
                expect(() => logic.registerUser(true, username, password, email, city)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array name', () => {
                expect(() => logic.registerUser(['true', 'false'], username, password, email, city)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object name', () => {
                expect(() => logic.registerUser({ o: 'bj' }, username, password, email, city)).to.throw(TypeError, '[object Object] is not a string')
            })


            it('should fail on undefined username', () => {
                expect(() => logic.registerUser(name, undefined, password, email, city)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null username', () => {
                expect(() => logic.registerUser(name, null, password, email, city)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank username', () => {
                expect(() => logic.registerUser(name, '           \n', password, email, city)).to.throw(ValueError, 'username is empty or blank')
            })

            it('should fail on number username', () => {
                expect(() => logic.registerUser(name, 123, password, email, city)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean username', () => {
                expect(() => logic.registerUser(name, true, password, email, city)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array username', () => {
                expect(() => logic.registerUser(name, ['true', 'false'], password, email, city)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object username', () => {
                expect(() => logic.registerUser(name, { o: 'bj' }, password, email, city)).to.throw(TypeError, '[object Object] is not a string')
            })


            it('should fail on undefined password', () => {
                expect(() => logic.registerUser(name, username, undefined, email, city)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null password', () => {
                expect(() => logic.registerUser(name, username, null, email, city)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank password', () => {
                expect(() => logic.registerUser(name, username, '           \n', email, city)).to.throw(ValueError, 'password is empty or blank')
            })

            it('should fail on number password', () => {
                expect(() => logic.registerUser(name, username, 123, email, city)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean password', () => {
                expect(() => logic.registerUser(name, username, true, email, city)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array password', () => {
                expect(() => logic.registerUser(name, username, ['true', 'false'], email, city)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object password', () => {
                expect(() => logic.registerUser(name, username, { o: 'bj' }, email, city)).to.throw(TypeError, '[object Object] is not a string')
            })


            it('should fail on undefined email', () => {
                expect(() => logic.registerUser(name, username, password, undefined, city)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null email', () => {
                expect(() => logic.registerUser(name, username, password, null, city)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank email', () => {
                expect(() => logic.registerUser(name, username, password, '           \n', city)).to.throw(ValueError, 'email is empty or blank')
            })

            it('should fail on number email', () => {
                expect(() => logic.registerUser(name, username, password, 123, city)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean email', () => {
                expect(() => logic.registerUser(name, username, password, true, city)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array email', () => {
                expect(() => logic.registerUser(name, username, password, ['true', 'false'], city)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object email', () => {
                expect(() => logic.registerUser(name, username, password, { o: 'bj' }, city)).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on undefined city', () => {
                expect(() => logic.registerUser(name, username, password, city, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null city', () => {
                expect(() => logic.registerUser(name, username, password, city, null)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank city', () => {
                expect(() => logic.registerUser(name, username, password, city, '           \n')).to.throw(ValueError, 'city is empty or blank')
            })

            it('should fail on number city', () => {
                expect(() => logic.registerUser(name, username, password, city, 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean city', () => {
                expect(() => logic.registerUser(name, username, password, city, true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array city', () => {
                expect(() => logic.registerUser(name, username, password, city, ['true', 'false'])).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object city', () => {
                expect(() => logic.registerUser(name, username, password, city, { o: 'bj' })).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on non correct email ', () => {
                expect(() => logic.registerUser(name, username, password, 'email@', city)).to.throw(Error, 'email@ is an invalid email')
            })

            it('should fail on existing user', async () => {
                await User.create({username:username}, {logging:false})

                expect(() => logic.registerUser(name, username, password, email, city)).to.throw(AlreadyExistsError, 'This username already exists')
            })



        })

        _login && describe('authenticate', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save({ logging: false })
            })

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('number')

                const users = await User.findAll({ logging: false })


                const [_user] = users

                expect(_user).not.to.be.undefined
                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null username', () => {
                expect(() => logic.authenticateUser(null, user.password).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank username', () => {
                expect(() => logic.authenticateUser('      \n', user.password).to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number username', () => {
                expect(() => logic.authenticateUser(123, user.password).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean username', () => {
                expect(() => logic.authenticateUser(true, user.password).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array username', () => {
                expect(() => logic.authenticateUser(['true', 'false'], user.password).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object username', () => {
                expect(() => logic.authenticateUser({ ob: 'j' }, user.password).to.throw(TypeError, '[object Object] is not a string'))
            })


            it('should fail on undefined password', () => {
                expect(() => logic.authenticateUser(user.username, undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null password', () => {
                expect(() => logic.authenticateUser(user.username, null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank password', () => {
                expect(() => logic.authenticateUser(user.username, '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number password', () => {
                expect(() => logic.authenticateUser(user.username, 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean password', () => {
                expect(() => logic.authenticateUser(user.username, true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array password', () => {
                expect(() => logic.authenticateUser(user.username, ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object password', () => {
                expect(() => logic.authenticateUser(user.username, { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

        })

        _ret_user && describe('retrieve user', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com' })

                await user.save({ logging: false })
            })

            it('should succeed on valid id', async () => {

                _user = await logic.retrieveUser(user.id.toString())

                expect(_user).not.to.be.instanceof(User)

                const { id, name, username, email, password } = _user

                expect(id).to.exist
                expect(id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(username).to.equal(user.username)
                expect(email).to.be.equal(user.email)
                expect(password).to.be.undefined
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

        _up_user && describe('update user', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', email: 'pacus@maximus.com', password: '123' }, { logging: false })

                await user.save({ logging: false })
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

            // TODO other test cases

            describe('with existing user', () => {
                let user2

                !false && beforeEach(async () => {

                    user2 = User.build({ name: 'John', username: 'jd2', email: 'pacus@', password: '123' })

                    await user2.save({ logging: false })
                })

                it('should update on correct data and password', () => {
                    const { id, name, username, email, password } = user2

                    const newUsername = 'jd'

                    return logic.updateUser(id.toString(), null, newUsername, null, null, password)
                        .then(() => expect(true).to.be.false)
                        .catch(err => {
                            expect(err).to.be.instanceof(AlreadyExistsError)

                            return User.findByPk(id, { logging: false })
                        })
                        .then(postit => {
                            expect(postit.id).to.equal(id)

                            expect(postit.name).to.equal(name)
                            expect(postit.email).to.equal(email)
                            expect(postit.username).to.equal(username)
                            expect(postit.password).to.equal(password)
                        })
                })
            })
        })

        _ret_profile && describe('retrieve profile', () => {
            let user

            !false && beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user.save({ logging: false })

                await Offer.create({ user_id: user.id, lenguage: 'spanish' }, { logging: false })

                await Searching.create({ user_id: user.id, lenguage: 'spanish' }, { logging: false })
            })

            it('should succeed on valid id', async () => {

                _user = await logic.retrieveProfile(user.id.toString())
                offers = await Offer.findAll({ where: { user_id: user.id }, logging: false })
                searchings = await Searching.findAll({ where: { user_id: user.id }, logging: false })

                expect(_user).to.exist
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

                expect(_user.offer[0]).to.exist
                expect(_user.offer[0]).to.be.equal(offers[0].lenguage)

                expect(_user.searching[0]).to.exist
                expect(_user.searching[0]).to.be.equal(searchings[0].lenguage)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.retrieveProfile(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.retrieveProfile(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.retrieveProfile('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.retrieveProfile(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.retrieveProfile(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.retrieveProfile(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.retrieveProfile({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })
        })

        _up_profile && describe('update profile', () => {
            let user, newEmail, newSkype, newAge, newGender, newHeight, newWeight, newSmoker, newDescription, newReceives, newMoves, newCity

            !false && beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user.save({ logging: false })
            })

            it('should update on correct data and password', async () => {
                let { id, name, username, password, email, skype, available, age, gender, city } = user

                newEmail = `${'newEmail'}-${Math.random()}`
                newName = `newName-${Math.random()}`
                newSkype = `${'newSkype'}-${Math.random()}`
                newAge = Math.floor(Math.random() * 10)
                newGender = `${'newGender'}-${Math.random()}`
                newHeight = Math.floor(Math.random() * 10)
                newWeight = Math.floor(Math.random() * 10)
                newSmoker = true
                newDescription = `${'newDescription'}-${Math.random()}`
                newReceives = true
                newMoves = true
                newCity = `${'newCity'}-${Math.random()}`


                newOffers = ['portuguese', "italian"]
                newSearching = ['portuguese', "italian", 'chinese', 'spanish']

                await logic.updateProfile(id.toString(), newName, newEmail, newSkype, newAge, newGender, newHeight, newWeight, newSmoker, newDescription, newReceives, newMoves, newCity, newOffers, newSearching)

                const users = await User.findAll({ where: {}, logging: false })

                const offers = await Offer.findAll({ where: { user_id: id }, logging: false })

                const demands = await Searching.findAll({ where: { user_id: id }, logging: false })

                expect(users.length).to.equal(1)
                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.email).to.equal(newEmail)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)

                expect(_user.skype).to.equal(newSkype)
                expect(_user.age).to.equal(newAge)
                expect(_user.gender).to.equal(newGender)
                expect(_user.height).to.equal(newHeight)
                expect(_user.weight).to.equal(newWeight)
                expect(_user.smoker).to.equal(newSmoker)
                expect(_user.description).to.equal(newDescription)
                expect(_user.receives).to.equal(newReceives)
                expect(_user.moves).to.equal(newMoves)
                expect(_user.city).to.equal(newCity)

                offers.forEach((offer, index) => {
                    expect(offer.user_id).to.be.equal(id)
                    expect(offer.lenguage).to.be.equal(newOffers[index])
                })

                demands.forEach((demand, index) => {
                    expect(demand.user_id).to.be.equal(id)
                    expect(demand.lenguage).to.be.equal(newSearching[index])
                })
            })

            it('should update on correct id and email (other fields null)', async () => {
                const { id, name, username, password, email, skype, age, available, height, weight, smoker, description, gender, receives, moves, city } = user

                newEmail = `${'newEmail'}-${Math.random()}`

                debugger
                await logic.updateProfile(id.toString(), null, newEmail, null, null, null, null, null, null, null, null, null, null, newOffers, newSearching)

                const users = await User.findAll({ logging: false })

                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.email).to.equal(newEmail)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)

                expect(_user.skype).to.equal(skype)
                expect(_user.age).to.equal(age)
                expect(_user.gender).to.equal(gender)
                expect(_user.height).to.equal(height)
                expect(_user.weight).to.equal(weight)
                expect(_user.smoker).to.equal(smoker)
                expect(_user.description).to.equal(description)
                expect(_user.receives).to.equal(receives)
                expect(_user.moves).to.equal(moves)
                expect(_user.city).to.equal(city)

                const offers = await Offer.findAll({ where: { user_id: id }, logging: false })

                offers.forEach((offer, index) => {
                    expect(offer.user_id).to.be.equal(id)
                    expect(offer.lenguage).to.be.equal(newOffers[index])
                })

                const demands = await Searching.findAll({ where: { user_id: id }, logging: false })

                demands.forEach((demand, index) => {
                    expect(demand.user_id).to.be.equal(id)
                    expect(demand.lenguage).to.be.equal(newSearching[index])
                })
            })

            it('should update on correct id and skype (other fields null, except languages)', async () => {
                const { id, name, username, password, email, skype, age, available, height, weight, smoker, description, gender, receives, moves, city } = user

                newSkype = `${'newSkype'}-${Math.random()}`

                await logic.updateProfile(id.toString(), null, null, newSkype, null, null, null, null, null, null, null, null, null, newOffers, newSearching)

                const users = await User.findAll({ logging: false })

                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.username).to.equal(username)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.equal(password)

                expect(_user.skype).to.equal(newSkype)

                expect(_user.age).to.equal(age)
                expect(_user.gender).to.equal(gender)
                expect(_user.height).to.equal(height)
                expect(_user.weight).to.equal(weight)
                expect(_user.smoker).to.equal(smoker)
                expect(_user.description).to.equal(description)
                expect(_user.receives).to.equal(receives)
                expect(_user.moves).to.equal(moves)
                expect(_user.city).to.equal(city)

                const offers = await Offer.findAll({ where: { user_id: id }, logging: false })

                offers.forEach((offer, index) => {
                    expect(offer.user_id).to.be.equal(id)
                    expect(offer.lenguage).to.be.equal(newOffers[index])
                })

                const demands = await Searching.findAll({ where: { user_id: id }, logging: false })

                demands.forEach((demand, index) => {
                    expect(demand.user_id).to.be.equal(id)
                    expect(demand.lenguage).to.be.equal(newSearching[index])
                })
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(undefined, name, email)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(null, name, email)).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on blank id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile('           \n', name, email)).to.throw(ValueError, 'id is empty or blank')
            })

            it('should fail on number id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(123, name, email)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(true, name, email)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile([true, false], name, email)).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile({ ob: 'j' }, name, email)).to.throw(TypeError, '[object Object] is not a string')
            })

            // it('should fail on undefined name', () => {
            //     const { id, name, email, username, password } = user

            //     expect(() => logic.updateProfile(id, undefined)).to.throw(TypeError, 'undefined is not a string')
            // })

            // it('should fail on null name', () => {
            //     const { id, name, email, username, password } = user

            //     expect(() => logic.updateProfile(id,null)).to.throw(TypeError, 'null is not a string')
            // })

            it('should fail on blank name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), '           \n')).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on number name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), [true, false])).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object name', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), { ob: 'j' })).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on blank email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, '           \n')).to.throw(ValueError, 'email is empty or blank')
            })

            it('should fail on number email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, [true, false])).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object email', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on blank skype', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, '           \n')).to.throw(ValueError, 'skype is empty or blank')
            })

            it('should fail on number skype', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean skype', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array skype', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, [true, false])).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object skype', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on blank age', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, '           \n')).to.throw(TypeError, ' is not a number')
            })

            it('should fail on string age', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, '123')).to.throw(TypeError, '123 is not a number')
            })

            it('should fail on boolean age', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, true)).to.throw(TypeError, 'true is not a number')
            })

            it('should fail on array age', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, [true, false])).to.throw(TypeError, 'true,false is not a number')
            })

            it('should fail on object age', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a number')
            })

            it('should fail on blank gender', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, '           \n')).to.throw(ValueError, 'gender is empty or blank')
            })

            it('should fail on number gender', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, 123)).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on boolean gender', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, true)).to.throw(TypeError, 'true is not a string')
            })

            it('should fail on array gender', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, [true, false])).to.throw(TypeError, 'true,false is not a string')
            })

            it('should fail on object gender', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on blank height', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, '           \n')).to.throw(TypeError, ' is not a number')
            })

            it('should fail on string height', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, '123')).to.throw(TypeError, '123 is not a number')
            })

            it('should fail on boolean height', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, true)).to.throw(TypeError, 'true is not a number')
            })

            it('should fail on array height', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, [true, false])).to.throw(TypeError, 'true,false is not a number')
            })

            it('should fail on object height', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a number')
            })

            it('should fail on blank weight', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, null, '           \n')).to.throw(TypeError, ' is not a number')
            })

            it('should fail on string weight', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, null, '123')).to.throw(TypeError, '123 is not a number')
            })

            it('should fail on boolean weight', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, null, true)).to.throw(TypeError, 'true is not a number')
            })

            it('should fail on array weight', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, null, [true, false])).to.throw(TypeError, 'true,false is not a number')
            })

            it('should fail on object weight', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(id.toString(), null, null, null, null, null, null, { ob: 'j' })).to.throw(TypeError, '[object Object] is not a number')
            })
        })

        _search && describe('search profiles', () => {
            let user1, user2, user3

            beforeEach(async () => {
                user1 = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user1.save({ logging: false })

                user2 = User.build({ name: 'John', username: 'jd2', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', smoker: true, city: 'barcelona' }, { logging: false })

                await user2.save({ logging: false })

                user3 = User.build({ name: 'John', username: 'jd3', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user3.save({ logging: false })
            })

            it('should succed on correct data: search by username', async () => {
                const query = 'username=jd2'

                const results = await logic.search(query, user1.id.toString())
                const result = results[0]

                expect(result).to.exist

                const obj = { where: { username: 'jd2' }, logging: false }

                const users = await User.findAll(obj)

                const user = users[0]

                expect(result).not.to.be.instanceOf(User)
                expect(result.username).to.be.equal(user.username)
                expect(result.id).to.be.equal(user.id)
                expect(result.age).to.be.equal(user.age)
                expect(result.gender).to.be.equal(user.gender)
                expect(result.description).to.be.equal(user.description)

                expect(JSON.stringify(result.userOffers)).to.be.equal(JSON.stringify([]))
                expect(JSON.stringify(result.userSearchings)).to.be.equal(JSON.stringify([]))

            })

            it('should succed on correct data (when has lenguages): search by username', async () => {
                await Offer.create({ user_id: user1.id, lenguage: 'spanish' }, { logging: false })

                await Offer.create({ user_id: user2.id, lenguage: 'english' }, { logging: false })
                await Searching.create({ user_id: user2.id, lenguage: 'english' }, { logging: false })
                await Searching.create({ user_id: user2.id, lenguage: 'spanish' }, { logging: false })
                const offers = ['english', 'hindi']
                const searches = ['english', 'spanish']
                const query = 'username=jd2&offer=english+hindi&searching=english+spanish'
                const username = 'jd'


                const results = await logic.search(query, user1.id.toString())

                const result = results[0]

                expect(result).to.exist

                const obj = {
                    where: { username: { like: '%' + username + '%' } },
                    include: [{
                        model: Offer,
                        as: 'userOffers',
                        where: {
                            lenguage: { [Sequelize.Op.or]: offers }
                        }
                    },
                    {
                        model: Searching,
                        as: 'userSearchings',
                        where: {
                            lenguage: { [Sequelize.Op.or]: searches }
                        }
                    }]
                    , logging: false
                }

                const users = await User.findAll(obj)

                const user = users[0]

                expect(result).not.to.be.instanceOf(User)
                expect(result.username).to.be.equal(user.username)

                expect(result.id).to.be.equal(user.id)
                expect(result.age).to.be.equal(user.age)
                expect(result.gender).to.be.equal(user.gender)
                expect(result.description).to.be.equal(user.description)

                expect(result.userOffers.length).to.be.equal(user.userOffers.length)
                expect(JSON.stringify(result.userOffers)).to.be.equal(JSON.stringify(user.userOffers))

                expect(result.userSearchings.length).to.be.equal(user.userSearchings.length)
                expect(JSON.stringify(result.userSearchings)).to.be.equal(JSON.stringify(user.userSearchings))
            })

            it('should succed on correct data (when has lenguages): search by username, age, gender, city, smoker', async () => {


                await Offer.create({ user_id: user1.id, lenguage: 'spanish' }, { logging: false })

                await Offer.create({ user_id: user2.id, lenguage: 'english' }, { logging: false })
                await Searching.create({ user_id: user2.id, lenguage: 'english' }, { logging: false })
                await Searching.create({ user_id: user2.id, lenguage: 'spanish' }, { logging: false })

                const offers = ['english', 'hindi']
                const searches = ['english', 'spanish']

                const query = `username=jd2&offer=english+hindi&searching=english+spanish&age=38&gender=male&smoker=true&city=barcelona`
                const username = 'jd'

                const results = await logic.search(query, user1.id.toString())

                const result = results[0]

                expect(result).to.exist

                const obj = {
                    where: {
                        username: { like: '%' + username + '%' },
                        age: 38,
                        gender: 'male',
                        smoker: true,
                        city: 'barcelona'
                    },
                    include: [{
                        model: Offer,
                        as: 'userOffers',
                        where: {
                            lenguage: { [Sequelize.Op.or]: offers }
                        }
                    },
                    {
                        model: Searching,
                        as: 'userSearchings',
                        where: {
                            lenguage: { [Sequelize.Op.or]: searches }
                        }
                    }]
                    , logging: false
                }

                const users = await User.findAll(obj)

                const user = users[0]

                expect(result).not.to.be.instanceOf(User)
                expect(result.username).to.be.equal(user.username)

                expect(result.id).to.be.equal(user.id)
                expect(result.age).to.be.equal(user.age)
                expect(result.gender).to.be.equal(user.gender)
                expect(result.description).to.be.equal(user.description)
                debugger
                expect(result.smoker).to.be.equal(user.smoker)

                expect(result.userOffers.length).to.be.equal(user.userOffers.length)
                expect(JSON.stringify(result.userOffers)).to.be.equal(JSON.stringify(user.userOffers))

                expect(result.userSearchings.length).to.be.equal(user.userSearchings.length)
                expect(JSON.stringify(result.userSearchings)).to.be.equal(JSON.stringify(user.userSearchings))

            })
            // when has gender, age, smoke, city, 

            it('should fail on undefined query', () => {

                expect(() => logic.search(undefined, user1.id.toString()).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null query', () => {

                expect(() => logic.search(null, user1.id.toString()).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank query', () => {

                expect(() => logic.search('            \n', user1.id.toString()).to.throw(ValueError, 'id is empty or blank'))
            })

            it('should fail on number query', () => {

                expect(() => logic.search(123, user1.id.toString()).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean query', () => {

                expect(() => logic.search(true, user1.id.toString()).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array query', () => {

                expect(() => logic.search([true, false], user1.id.toString()).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object query', () => {

                expect(() => logic.search({ o: 'j' }, user1.id.toString()).to.throw(TypeError, '[object Object] is not a string'))
            })

            it('should fail on undefined id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, '         \n').to.throw(ValueError, 'id is empty or blank'))
            })

            it('should fail on number id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, [true, false]).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                const query = 'queryExample'
                expect(() => logic.search(query, { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

        })

        _del_account && describe('delete account', () => {
            let user, user2, text, message

            beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user.save({ logging: false })

                user2 = User.build({ name: 'John', username: 'jd2', password: '123', email: 'paco@gmail.com', skype: 'pacusmaximus', available: false, age: 38, gender: 'male', city: 'barcelona' }, { logging: false })

                await user2.save({ logging: false })

                text = `text-${Math.random()}`

                message = Message.build({
                    sender_id: user.id, receiver_id: user2.id, text: text
                })

                await message.save({ logging: false })

                await Conversation.create({ user1_id: user.id, user2_id: user2.id }, { logging: false })

                await Offer.create({ user_id: user.id, lenguage: 'spanish' }, { logging: false })
                await Searching.create({ user_id: user.id, lenguage: 'spanish' }, { logging: false })

            })

            it('should succed on correct data', async () => {

                await logic.deleteAccount(user.id.toString())

                const _user = await User.findByPk(user.id.toString(), { logging: false })
                expect(_user).to.not.exist

                const offers = await Offer.findAll({ where: {}, logging: false })
                const searchings = await Searching.findAll({ where: {}, logging: false })

                const conversations = await Conversation.findAll({ where: {}, logging: false })
                const messages = await Message.findAll({ where: {}, logging: false })

                expect(offers.length).to.be.equal(0)
                expect(searchings.length).to.be.equal(0)
                expect(conversations.length).to.be.equal(0)
                expect(messages.length).to.be.equal(0)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.deleteAccount(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.deleteAccount(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.deleteAccount('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.deleteAccount(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.deleteAccount(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.deleteAccount(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.deleteAccount({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })
        })

    })

    describe('conversations', () => {

        _send_message && describe('send message', () => {
            let name, username, password, email, text

            beforeEach(async () => {

                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save({ logging: false })

                user2 = User.build({
                    name: 'John', username: 'jd2', password: '123', email: 'jd@gmail.com'
                })

                await user2.save({ logging: false })

                text = `text-${Math.random()}`

            })

            it('should succeed on correct data', async () => {
                const date = new Date()

                await logic.sendMessage(user.id.toString(), user2.id.toString(), text, date.toString())

                const messages = await Message.findAll({ logging: false })

                expect(messages.length).to.be.equal(1)
                const message = messages[0]
                expect(message).not.to.be.equal(undefined)

                expect(message.sender_id).to.be.equal(user.id)
                expect(message.receiver_id).be.equal(user2.id)
                expect(message.text).to.be.equal(text)
                expect(message.createdAt.toString()).to.be.equal(date.toString())

                const conversations = await Conversation.findAll({ logging: false })
                expect(conversations.length).to.be.equal(1)

                const conversation = conversations[0]
                expect(conversation).not.to.be.equal(undefined)
                expect(conversation.user1_id).to.be.equal(user.id)
                expect(conversation.user2_id).to.be.equal(user2.id)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.sendMessage(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.sendMessage(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.sendMessage('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.sendMessage(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.sendMessage(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.sendMessage(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.sendMessage({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

            it('should fail on undefined user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object user2_id', () => {
                expect(() => logic.sendMessage(user.id.toString(), { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

            it('should fail on undefined text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object text', () => {
                expect(() => logic.sendMessage(user.id.toString(), user2.id.toString(), { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

        })

        _ret_messages && describe('retrieve messages', () => {
            let name, username, password, email, text, message, message2, date


            beforeEach(async () => {

                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save({ logging: false })

                user2 = User.build({
                    name: 'John', username: 'jd2', password: '123', email: 'jd@gmail.com'
                })

                await user2.save({ logging: false })

                text = `text-${Math.random()}`

                message = Message.build({
                    sender_id: user.id, receiver_id: user2.id, text: text
                })

                date = new Date()
                message.createdAt = date

                await message.save({ logging: false })

                message2 = Message.build({
                    sender_id: user2.id, receiver_id: user.id, text: text
                })

                date = new Date()
                message2.createdAt = date

                await message2.save({ logging: false })
            })

            it('should succeed on correct data', async () => {

                const list_messages = await logic.listChats(user.id.toString(), user2.id.toString())

                expect(list_messages.length).to.be.equal(2)
                const message = list_messages[0]
                const message2 = list_messages[1]

                expect(message.sender_id).to.be.equal(user.id)
                expect(message.receiver_id).be.equal(user2.id)
                expect(message.text).to.be.equal(text)

                expect(message2.sender_id).to.be.equal(user2.id)
                expect(message2.receiver_id).be.equal(user.id)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.listChats(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.listChats(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.listChats('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.listChats(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.listChats(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.listChats(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.listChats({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

            it('should fail on undefined user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object user2_id', () => {
                expect(() => logic.listChats(user.id.toString(), { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

        })

        _list_conversations && describe('list conversations', () => {
            let name, username, password, email, text, user, user2

            beforeEach(async () => {

                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save({ logging: false })

                user2 = User.build({
                    name: 'John', username: 'jd2', password: '123', email: 'jd@gmail.com'
                })

                await user2.save({ logging: false })

                text = `text-${Math.random()}`

                await Conversation.create({ user1_id: user.id, user2_id: user2.id }, { logging: false })

            })

            it('should succeed on correct data', async () => {

                const conversations = await logic.listConversations(user.id.toString(), user2.id.toString())

                expect(conversations.length).to.be.equal(1)
                const conversation = conversations[0]

                expect(conversation.user1_id).to.be.equal(user.id)
                expect(conversation.user2_id).be.equal(user2.id)
                expect(conversation.user2_username).be.equal(user2.username)

            })

            it('should fail on undefined id', () => {
                expect(() => logic.listConversations(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.listConversations(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.listConversations('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.listConversations(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.listConversations(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.listConversations(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.listConversations({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

            it('should fail on undefined user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object user2_id', () => {
                expect(() => logic.listConversations(user.id.toString(), { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

        })

        _check_conversations && describe('check if exists Conversations with one user', () => {
            let name, username, password, email, text, user, user2

            beforeEach(async () => {

                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save({ logging: false })

                user2 = User.build({
                    name: 'John', username: 'jd2', password: '123', email: 'jd@gmail.com'
                })

                await user2.save({ logging: false })

                text = `text-${Math.random()}`

                message = Message.build({
                    sender_id: user.id, receiver_id: user2.id, text: text
                })

                await message.save({ logging: false })

                await Conversation.create({ user1_id: user.id, user2_id: user2.id }, { logging: false })

            })

            it('should succeed on correct data', async () => {

                const result = await logic.checkExistingConversation(user.id.toString(), user2.id.toString())
                debugger

                expect(result).to.be.equal(true)
            })

            it('should fail on undefined id', () => {
                expect(() => logic.checkExistingConversation(undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null id', () => {
                expect(() => logic.checkExistingConversation(null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank id', () => {
                expect(() => logic.checkExistingConversation('      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number id', () => {
                expect(() => logic.checkExistingConversation(123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean id', () => {
                expect(() => logic.checkExistingConversation(true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array id', () => {
                expect(() => logic.checkExistingConversation(['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object id', () => {
                expect(() => logic.checkExistingConversation({ ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

            it('should fail on undefined user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), undefined).to.throw(TypeError, 'undefined is not a string'))
            })

            it('should fail on null user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), null).to.throw(TypeError, 'null is not a string'))
            })

            it('should fail on blank user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), '      \n').to.throw(ValueError, 'name is empty or blank'))
            })

            it('should fail on number user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), 123).to.throw(TypeError, '123 is not a string'))
            })

            it('should fail on boolean user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), true).to.throw(TypeError, 'true is not a string'))
            })

            it('should fail on array user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), ['true', 'false']).to.throw(TypeError, 'true,false is not a string'))
            })

            it('should fail on object user2_id', () => {
                expect(() => logic.checkExistingConversation(user.id.toString(), { ob: 'j' }).to.throw(TypeError, '[object Object] is not a string'))
            })

        })

    })

    after(() => sequelize.close().then(process.exit))
})
