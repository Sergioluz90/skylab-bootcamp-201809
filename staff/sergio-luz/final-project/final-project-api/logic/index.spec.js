require('dotenv').config()
const { User } = require('../data')
const Sequelize = require('sequelize');
const logic = require('../logic')
const { expect } = require('chai')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const flag = true;

const { env: { PORT, DATABASE_URL_TEST } } = process

const sequelize = new Sequelize(DATABASE_URL_TEST, { logging: false })

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

        // await User.sync({force:true, logging:false})
        await User.destroy({ where: {}, logging: false })
    })

    describe('user', () => {
        !flag && describe('register', () => {
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

        !flag && describe('authenticate', () => {
            let user

            beforeEach(async () => {
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

                const users = await User.findAll()


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

            // TODO other test cases
        })

        !flag && describe('retrieve user', () => {
            let user

            beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com' })

                await user.save()
            })

            it('should succeed on valid id', async () => {

                _user = await logic.retrieveProfile(user.id.toString())

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

        !flag && describe('update user', () => {
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

        !flag && describe('retrieve profile', () => {
            let user

            beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', password: '123', email: 'paco@gmail.com' })

                await user.save()
            })

            it('should succeed on valid id', async () => {

                _user = await logic.retrieveProfile(user.id)

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
            })
        })

        !flag && describe('update profile', () => {
            let user, newEmail, newSkype, newAge, newGender, newHeight, newWeight, newSmoker, newDescription, newReceives, newMoves, newCity

            beforeEach(async () => {
                user = User.build({ name: 'John', username: 'jd', email: 'pacus@maximus.com', password: '123' })

                await user.save()
            })

            it('should update on correct data and password', async () => {
                let { id, name, username, email, password } = user

                newEmail = `${'newEmail'}-${Math.random()}`
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

                await logic.updateProfile(id, username, newEmail, newSkype, newAge, newGender, newHeight, newWeight, newSmoker, newDescription, newReceives, newMoves, newCity)

                const users = await User.findAll()

                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(name)
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
            })

            it('should update on correct id, username and email (other fields null)', async () => {
                const { id, name, username, email, password } = user

                newEmail = `${'newEmail'}-${Math.random()}`

                await logic.updateProfile(id, username, newEmail, null, null, null, null, null, null, null, null, null, null)

                const users = await User.findAll()

                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.email).to.equal(newEmail)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)

                expect(_user.skype).to.equal('not defined')
                expect(_user.age).to.equal(null)
                expect(_user.gender).to.equal('not defined')
                expect(_user.height).to.equal(null)
                expect(_user.weight).to.equal(null)
                expect(_user.smoker).to.equal(null)
                expect(_user.description).to.equal(null)
                expect(_user.receives).to.equal(false)
                expect(_user.moves).to.equal(false)
                expect(_user.city).to.equal('not defined')
            })

            it('should update on correct id, username and skype (other fields null)', async () => {
                const { id, name, username, email, password } = user

                newSkype = `${'newSkype'}-${Math.random()}`

                await logic.updateProfile(id, username, null, newSkype, null, null, null, null, null, null, null, null, null)

                const users = await User.findAll()

                const _user = users[0]

                expect(_user.dataValues.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.username).to.equal(username)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.equal(password)

                expect(_user.skype).to.equal(newSkype)

                expect(_user.age).to.equal(null)
                expect(_user.gender).to.equal('not defined')
                expect(_user.height).to.equal(null)
                expect(_user.weight).to.equal(null)
                expect(_user.smoker).to.equal(null)
                expect(_user.description).to.equal(null)
                expect(_user.receives).to.equal(false)
                expect(_user.moves).to.equal(false)
                expect(_user.city).to.equal('not defined')
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, email, username, password } = user

                expect(() => logic.updateProfile(undefined, username, email)).to.throw(TypeError, 'undefined is not a number')
            })

            // TODO other test cases
        })
    })

    after(() => sequelize.close())
})
