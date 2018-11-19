require('dotenv').config()
const { User } = require('../data')
const Sequelize = require('sequelize');
const logic = require('../logic')
const { expect } = require('chai')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')


const { env: { PORT, DATABASE_URL } } = process

const sequelize = new Sequelize(DATABASE_URL, { logging: false })

describe('logic', () => {

    before(() => {
        sequelize
            .authenticate({ logging: false })
            .then(() => {
                const { argv: [, , port = PORT || 3306] } = process
                console.log('Connection has been established successfully at port ' + PORT)
            })
            .catch(err => {
                console.error('Unable to connect to the database:');
            })
    })

    beforeEach(async () => {
        await User.sync({ force: true })
    })

    describe('user', () => {
        !false && describe('register', () => {
            let name, username, password, email

            beforeEach(() => {
                name = `name-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
                email = `email-${Math.random()}`
            })

            it('should succeed on correct data', async () => {

                const res = await logic.registerUser(name, username, password, email)

                expect(res).to.be.undefined

                const _users = await User.findAll()

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
        })

        !false && describe('authenticate', () => {
            let user

            beforeEach(async () => {
                user = User.build({
                    name: 'John', username: 'jd', password: '123', email: 'jd@gmail.com'
                })

                await user.save()
            })

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('number')

                const users = await User.findAll()


                const [_user] = users

                expect(_user).not.to.be.undefined
                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        !false && describe('retrieve', () => {
            let user

            beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com' })

                await user.save()
            })

            it('should succeed on valid id', async () => {

                _user = await logic.retrieveUser(user.id)

                expect(_user).not.to.be.instanceof(User)

                const { id, name, surname, username, password, postits } = _user

                expect(id).to.exist
                expect(id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(surname).to.equal(user.surname)
                expect(username).to.equal(user.username)
                expect(password).to.be.undefined
                expect(postits).not.to.exist
            })
        })

        !false && describe('update', () => {
            let user

            beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', email: 'pacus@maximus.com', password: '123' })

                await user.save()
            })

            it('should update on correct data and password', async () => {
                let { id, name, username, email, password } = user

                const newName = `${name}-${Math.random()}`
                const newEmail = `${email}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                await logic.updateUser(id, newName, newUsername, newEmail, newPassword, password)

                const users = await User.findAll()

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

                return logic.updateUser(id, newName, null, null, null, password)
                    .then(() => User.findAll())
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

                return logic.updateUser(id, null, null, newEmail, null, password)
                    .then(() => User.findAll())
                    .then(users => {
                        const _user2 = users[0]

                        expect(_user2.id).to.equal(id)

                        expect(_user2.name).to.equal(name)
                        expect(_user2.email).to.equal(newEmail)
                        expect(_user2.username).to.equal(username)
                        expect(_user2.password).to.equal(password)
                    })
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateUser(undefined, name, username, email, password, password)).to.throw(TypeError, 'undefined is not a number')
            })

            // TODO other test cases

            describe('with existing user', () => {
                let user2

                beforeEach(async () => {

                    user2 = User.build({ name: 'John', username: 'jd2', email: 'pacus@', password: '123' })

                    await user2.save()
                })

                it('should update on correct data and password', () => {
                    const { id, name, username, email, password } = user2

                    const newUsername = 'jd'

                    return logic.updateUser(id, null, newUsername, null, null, password)
                        .then(() => expect(true).to.be.false)
                        .catch(err => {
                            expect(err).to.be.instanceof(AlreadyExistsError)

                            return User.findById(id)
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

        
    })
})
