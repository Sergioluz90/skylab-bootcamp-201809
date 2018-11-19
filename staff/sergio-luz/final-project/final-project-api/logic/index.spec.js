require('dotenv').config()

const mongoose = require('mongoose')
const { User, Postit } = require('../data')
const logic = require('.')
const { AlreadyExistsError } = require('../errors')

const { expect } = require('chai')

const { env: { MONGO_URL } } = process

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {

    before(() => { mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }) })

    beforeEach(async () => {
        await User.deleteMany()
        await Postit.deleteMany()
    })

    describe('user', () => {
        describe('register', () => {
            let name, surname, username, password

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', async () => {

                const res = await logic.registerUser(name, surname, username, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                expect(_users.length).to.equal(1)

                const [user] = _users

                expect(user.id).to.be.a('string')
                expect(user.name).to.be.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })


            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('authenticate', () => {
            let user

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                await user.save()
            })

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                const users = await User.find()


                const [_user] = users

                expect(_user).not.to.be.undefined
                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('retrieve', () => {
            let user, postit

            beforeEach(async () => {
                postit = new Postit({ text: 'hello text', status: 'DONE' })
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

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

        describe('update', () => {
            let user

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                await user.save()
            })

            it('should update on correct data and password', async () => {
                let { id, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`
                const newSurname = `${surname}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`

                await logic.updateUser(id, newName, newSurname, newUsername, newPassword, password)

                const users = await User.find()

                const [_user] = users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(newUsername)
                expect(_user.password).to.equal(newPassword)

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

        describe('buddies', () => {
            describe('add buddy', () => {
                let name, surname, username, username2, password

                beforeEach(async () => {
                    name = `name-${Math.random()}`
                    surname = `surname-${Math.random()}`
                    username = `username-${Math.random()}`
                    username2 = `username2-${Math.random()}`
                    password = `password-${Math.random()}`

                    user = new User({ name, surname, username, password })
                    user2 = new User({ name, surname, username: username2, password })

                    await user.save()
                    await user2.save()
                })
                it('Should add a buddy when correct data', async () => {

                    await logic.addBuddy(user.id, user2.username)

                    const _user = await User.findById(user.id)

                    expect(_user.buddies).not.to.be.undefined
                    expect(_user.buddies[0].toString()).to.be.equal(user2.id)
                })
            })

            describe('delete buddy', () => {
                let name, surname, username, username2, password

                beforeEach(async () => {
                    name = `name-${Math.random()}`
                    surname = `surname-${Math.random()}`
                    username = `username-${Math.random()}`
                    username2 = `username2-${Math.random()}`
                    password = `password-${Math.random()}`

                    user2 = new User({ name, surname, username: username2, password })
                    user = new User({ name, surname, username, password, buddies: [user2.id] })

                    await user2.save()
                    await user.save()
                })
                it('Should delete an existing buddy when correct data', async () => {

                    await logic.deleteBuddy(user.id, user2.id)

                    const _user = await User.findById(user.id)

                    expect(_user.buddies.length).to.be.equal(0)
                })
            })

            describe('list buddies', () => {
                let name, surname, username, username2, password
                let userlist

                beforeEach(async () => {
                    name = `name-${Math.random()}`
                    surname = `surname-${Math.random()}`
                    username = `username-${Math.random()}`
                    password = `password-${Math.random()}`
                    userlist = []

                    user = new User({ name, surname, username, password })

                    for (let i = 0; i < 2; i++) {

                        username2 = `username2-${Math.random()}`
                        user2 = new User({ name, surname, username: username2, password })
                        await user2.save()
                        user.buddies.push(user2.id)
                        userlist.push(user2.username)
                    }
                    await user.save()

                })

                it('should list buddies on correct data', async () => {

                    const list = await logic.listBuddies(user.id)

                    expect(list).not.to.be.undefined
                    expect(list.length).to.be.equal(2)
                    expect(list.toString()).to.be.equal(userlist.toString())
                })
            })
        })
    })

    describe('postits', () => {
        describe('add', () => {
            let user, text

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                text = `text-${Math.random()}`
                status = 'DONE'

                await user.save()
            })

            it('should succeed on correct data', async () => {

                await logic.addPostit(user.id, text, status)

                const postits = await Postit.find()
                const [postit] = postits

                expect(postit.text).to.equal(text)
                expect(postit.status).to.equal(status)

                expect(postit.user.toString()).to.equal(user.id)
            })

        })

        describe('assigned', () => {

            describe('assign a collaborator', () => {

                let user, postit, newText, status

                beforeEach(async () => {
                    user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                    status = 'DONE'

                    postit = new Postit({ text: 'hello text', status, user: user.id })

                    newText = `new-text-${Math.random()}`

                    collaborator = new User({ name: 'John', surname: 'Doe', username: 'DP', password: '123' })

                    await user.save()
                    await postit.save()
                    await collaborator.save()
                })

                it('Should assign succesful when correct data', async () => {

                    await logic.assignCollaborator(user.id, postit.id, collaborator.username)

                    const _postit = await Postit.findById(postit.id)
                    
                    expect(_postit).to.exist
                    expect(_postit.assigned).not.to.be.undefined
                    expect(_postit.assigned.toString()).to.be.equal(collaborator.id)
                })
            })

            describe('unassign a collaborator', () => {

                let user, postit, newText, status

                beforeEach(async () => {
                    user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                    status = 'DONE'

                    postit = new Postit({ text: 'hello text', status, user: user.id })

                    newText = `new-text-${Math.random()}`

                    collaborator = new User({ name: 'John', surname: 'Doe', username: 'DP', password: '123' })

                    await user.save()
                    await postit.save()
                    await collaborator.save()

                    await logic.assignCollaborator(user.id, postit.id, collaborator.username)
                })

                it('Should unassign succesful when correct data', async () => {

                    await logic.unassignCollaborator(user.id, postit.id, collaborator.username)

                    const _postit = await Postit.findById(postit.id)

                    expect(_postit).to.exist
                    expect(_postit.assigned).to.be.null
                })
            })

            describe('list assigned postits', ()=>{
                let user, postit, newText, status

                beforeEach(async () => {
                    user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                    status = 'DONE'

                    postit = new Postit({ text: 'hello text', status, user: user.id })

                    newText = `new-text-${Math.random()}`

                    collaborator = new User({ name: 'John', surname: 'Doe', username: 'DP', password: '123' })

                    await user.save()
                    await postit.save()
                    await collaborator.save()

                    await logic.assignCollaborator(user.id, postit.id, collaborator.username)
                })

                it('Should list succesful when correct data', async () => {

                    const postits=await logic.listAssignedPostits(user.id)

                    expect(postits).to.exist
                })
            })
        })

        describe('list', () => {
            let user, postit, postit2

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit, postit2] })

                postit = new Postit({ text: 'hello text', status: 'DONE', user: user.id })
                postit2 = new Postit({ text: 'hello text 2', status: 'DOING', user: user.id })

                collaborator = new User({ name: 'John', surname: 'Doe', username: 'DP', password: '123' })

                await user.save()
                await postit.save()
                await postit2.save()
                await collaborator.save()

                postit.assigned = collaborator.id

                await postit.save()
            })

            it('should succeed on correct data', async () => {
                const postits = await logic.listPostits(user.id)

                const _postits = await Postit.find()
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
                expect(_postit.assigned.toString()).to.equal(collaborator.id)

                expect(_postit2.id).to.equal(__postit2.id)
                expect(_postit2.text).to.equal(__postit2.text)
            })



        })


        describe('remove', () => {
            let user, postit

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                postit = new Postit({ text: 'hello text', status: 'DONE', user: user.id })

                await user.save()
                await postit.save()
            })

            it('should succeed on correct data', async () => {
                const res = await logic.removePostit(user.id, postit.id)
                expect(res).to.be.undefined

                const postits = await Postit.find()
                expect(postits.length).to.equal(0)
            })
        })



        describe('modify', () => {
            let user, postit, newText, status

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                status = 'DONE'

                postit = new Postit({ text: 'hello text', status, user: user.id })

                newText = `new-text-${Math.random()}`

                await user.save()
                await postit.save()
            })

            it('should succeed on correct data', async () => {
                const res = await logic.modifyPostit(user.id, postit.id, newText, status)

                expect(res).to.be.undefined

                const postits = await Postit.find()

                expect(postits.length).to.equal(1)

                const [_postit] = postits

                expect(_postit.text.toString()).to.equal(newText)
                expect(_postit.status.toString()).to.equal(postit.status)
                expect(_postit.user.toString()).to.equal(user.id)

            })
        })

    })

    after(() => mongoose.disconnect())
})