require('dotenv').config()

const mongoose = require('mongoose')
const { User, Postit } = require('../data')
const logic = require('.')
const { AlreadyExistsError } = require('../errors')

const { expect } = require('chai')

const { env: { MONGO_URL_test } } = process

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {

    before(() => { mongoose.connect(MONGO_URL_test, { useNewUrlParser: true }) })

    beforeEach(() => Promise.all([User.deleteMany(), Postit.deleteMany()]))

    describe('user', () => {
        describe('register', () => {
            let name, surname, username, password

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', () =>
                logic.registerUser(name, surname, username, password)
                    .then(() => User.find())
                    .then(postits => {
                        expect(postits.length).to.equal(1)

                        const [user] = postits

                        expect(user.id).to.be.a('string')
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.username).to.equal(username)
                        expect(user.password).to.equal(password)
                    })
            )

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('authenticate', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                return user.save()
            })

            it('should authenticate on correct credentials', () => {
                const { username, password } = user

                return logic.authenticateUser(username, password)
                    .then(id => {
                        expect(id).to.exist
                        expect(id).to.be.a('string')

                        return User.find()
                            .then(postits => {
                                const [postit] = postits

                                expect(postit.id).to.equal(id)
                            })
                    })
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('retrieve', () => {
            let user, postit

            beforeEach(() => {
                postit = new Postit({ text: 'hello text', status: 'DONE' })
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                return user.save()
            })

            it('should succeed on valid id', () =>
                logic.retrieveUser(user.id)
                    .then(postit => {

                        expect(postit).not.to.be.instanceof(User)

                        const { id, name, surname, username, password, postits } = postit


                        expect(id).to.exist
                        expect(id).to.equal(user.id)
                        expect(name).to.equal(user.name)
                        expect(surname).to.equal(user.surname)
                        expect(username).to.equal(user.username)
                        expect(password).to.be.undefined
                        expect(postits).not.to.exist
                    })
            )
        })

        describe('update', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                return user.save()
            })

            it('should update on correct data and password', () => {
                const { id, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`
                const newSurname = `${surname}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                return logic.updateUser(id, newName, newSurname, newUsername, newPassword, password)
                    .then(() => User.find())
                    .then(postits => {
                        const [postit] = postits

                        expect(postit.id).to.equal(id)

                        const { name, surname, username, password } = postit

                        expect(name).to.equal(newName)
                        expect(surname).to.equal(newSurname)
                        expect(username).to.equal(newUsername)
                        expect(password).to.equal(newPassword)
                    })
            })

            it('should update on correct id, name and password (other fields null)', () => {
                const { id, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`

                return logic.updateUser(id, newName, null, null, null, password)
                    .then(() => User.find())
                    .then(postits => {
                        const [postit] = postits

                        expect(postit.id).to.equal(id)

                        expect(postit.name).to.equal(newName)
                        expect(postit.surname).to.equal(surname)
                        expect(postit.username).to.equal(username)
                        expect(postit.password).to.equal(password)
                    })
            })

            it('should update on correct id, surname and password (other fields null)', () => {
                const { id, name, surname, username, password } = user

                const newSurname = `${surname}-${Math.random()}`

                return logic.updateUser(id, null, newSurname, null, null, password)
                    .then(() => User.find())
                    .then(postits => {
                        const [postit] = postits

                        expect(postit.id).to.equal(id)

                        expect(postit.name).to.equal(name)
                        expect(postit.surname).to.equal(newSurname)
                        expect(postit.username).to.equal(username)
                        expect(postit.password).to.equal(password)
                    })
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, surname, username, password } = user

                expect(() => logic.updateUser(undefined, name, surname, username, password, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases

            describe('with existing user', () => {
                let user2

                beforeEach(() => {
                    user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                    user2 = new User({ name: 'John', surname: 'Doe', username: 'jd2', password: '123' })

                    return User.insertMany([user, user2])
                })

                it('should update on correct data and password', () => {
                    const { id, name, surname, username, password } = user2

                    const newUsername = 'jd'

                    return logic.updateUser(id, null, null, newUsername, null, password)
                        .then(() => expect(true).to.be.false)
                        .catch(err => {
                            expect(err).to.be.instanceof(AlreadyExistsError)

                            return User.findOne({ _id: id })
                        })
                        .then(postit => {
                            expect(postit.id).to.equal(id)

                            expect(postit.name).to.equal(name)
                            expect(postit.surname).to.equal(surname)
                            expect(postit.username).to.equal(username)
                            expect(postit.password).to.equal(password)
                        })
                })
            })
        })
    })

    describe('postits', () => {
        describe('add', () => {
            let user, text

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                text = `text-${Math.random()}`
                status = 'DONE'

                return user.save()
            })

            it('should succeed on correct data', () =>
                logic.addPostit(user.id, text, status)
                    .then(() => Postit.find())
                    .then(postits => {
                        const [postit] = postits

                        expect(postit.text).to.equal(text)
                        expect(postit.status).to.equal(status)

                        expect(postit.user.toString()).to.equal(user.id)
                    })
            )

            // TODO other test cases
        })

        describe('list', () => {
            let user, postit, postit2

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit, postit2] })

                postit = new Postit({ text: 'hello text', status: 'DONE', user: user.id })
                postit2 = new Postit({ text: 'hello text 2', status: 'DOING', user: user.id })

                return user.save()
                    .then(() => Promise.all([postit.save(), postit2.save()]))
            })

            it('should succeed on correct data', () =>
                logic.listPostits(user.id)
                    .then(postits => {
                        return Postit.find()
                            .then(_postits => {
                                expect(_postits.length).to.equal(2)

                                expect(postits.length).to.equal(_postits.length)

                                const [_postit, _postit2] = _postits

                                expect(_postit.id).to.equal(postit.id)
                                expect(_postit.text).to.equal(postit.text)

                                expect(_postit2.id).to.equal(postit2.id)
                                expect(_postit2.text).to.equal(postit2.text)

                                const [__postit, __postit2] = postits

                                expect(__postit).not.to.be.instanceof(Postit)
                                expect(__postit2).not.to.be.instanceof(Postit)

                                expect(_postit.id).to.equal(__postit.id)
                                expect(_postit.text).to.equal(__postit.text)

                                expect(_postit2.id).to.equal(__postit2.id)
                                expect(_postit2.text).to.equal(__postit2.text)
                            })
                    })
            )
        })


        describe('remove', () => {
            let user, postit

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                postit = new Postit({ text: 'hello text', status: 'DONE', user: user.id })

                return user.save()
                    .then(() => postit.save())
            })

            it('should succeed on correct data', () =>
                logic.removePostit(user.id, postit.id)
                    .then(() => Postit.find())
                    .then(postits => {

                        expect(postits.length).to.equal(0)
                    })
            )
        })

        describe('modify', () => {
            let user, postit, newText, status

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                status = 'DONE'

                postit = new Postit({ text: 'hello text', status, user: user.id })

                newText = `new-text-${Math.random()}`

                return user.save()
                    .then(()=>postit.save())
            })

            it('should succeed on correct data', () =>
                logic.modifyPostit(user.id, postit.id, newText, status)
                    .then(() => Postit.find())
                    .then(postits => {
                        expect(postits.length).to.equal(1)

                        const [_postit] = postits

                        expect(_postit.text.toString()).to.equal(newText)
                        expect(_postit.status.toString()).to.equal(postit.status)
                        expect(_postit.user.toString()).to.equal(user.id)
                    })
            )
        })
    })

    after(() => mongoose.disconnect())
})