const logic = require('./logic')

const { expect } = require('chai')

const flag = true

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('users', () => {
        !flag && describe('register', () => {
            it('should succeed on correct data', () => {
                try {
                    logic.registerUser('John', 'Doe', `jd-${Math.random()}`, '123')

                } catch (err) {
                    if (err) throw err

                    expect(true).to.be.true
                }
            }
            )

            it('should fail on trying to register twice same user', () => {
                const username = `jd-${Math.random()}`

                try {
                    logic.registerUser('John', 'Doe', username, '123')
                } catch (err) {
                    if (err) throw err

                    try {
                        logic.registerUser('John', 'Doe', username, '123')
                    } catch (err) {
                        if (err) throw err

                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`user with username "${username}" already exists`)
                    }
                }
            })

            it('should fail on undefined name', () => {
                expect(() =>
                    logic.registerUser(undefined, 'Doe', 'jd', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null name', () => {
                expect(() =>
                    logic.registerUser(null, 'Doe', 'jd', '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object name', () => {
                expect(() =>
                    logic.registerUser({}, 'Doe', 'jd', '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty name', () => {
                expect(() =>
                    logic.registerUser('      ', 'Doe', 'jd', '123')
                ).to.throw(Error, 'name is empty or blank')
            })

            it('should fail on undefined surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', undefined, 'jd', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', null, 'jd', '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', {}, 'jd', '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', '      ', 'jd', '123')
                ).to.throw(Error, 'surname is empty or blank')
            })

            it('should fail on undefined username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', undefined, '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', null, '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', {}, '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', '      ', '123')
                ).to.throw(Error, 'username is empty or blank')
            })

            it('should fail on undefined password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', undefined)
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', null)
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', {})
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', '      ')
                ).to.throw(Error, 'password is empty or blank')
            })
        })

        flag && describe('login', () => {
            describe('with existing user', () => {
                let username, password

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                })

                it('should succeed on correct data', () => {

                    try {
                        logic.login(username, password)
                    } catch (err) {
                        if (err) throw err

                        expect(true).to.be.true
                    }
                })

                it('should fail on wrong username', () => {
                    username = `dummy-${Math.random()}`

                    try {
                        logic.login(username, password)
                    } catch (err) {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal('invalid username or password')
                    }
                })

                it('should fail on wrong password', () => {
                    password = 'pepito'

                    try {
                        logic.login(username, password)
                    } catch (err) {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal('invalid username or password')
                    }
                })
            })

            it('should fail on undefined username', () => {
                const username = undefined

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on object username', () => {
                const username = {}

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `[object Object] is not a string`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() =>
                    logic.login('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on boolean password', () => {
                const password = true

                expect(() =>
                    logic.login('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on numeric password', () => {
                const password = 123

                expect(() =>
                    logic.login('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on object password', () => {
                const password = {}

                expect(() =>
                    logic.login('Jhon', password)
                ).to.throw(Error, `[object Object] is not a string`)
            })

        })

    })
})