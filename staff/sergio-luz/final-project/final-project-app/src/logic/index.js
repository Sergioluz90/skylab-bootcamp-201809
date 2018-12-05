const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')
global.sessionStorage = require('sessionstorage')


const logic = {

    _user: "",
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,

    get loggedIn() {
        return !!sessionStorage.getItem('userId')
    },

    get myId() {
        return sessionStorage.getItem('userId')
    },

    registerUser(name, username, email, city, password) {

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof city !== 'string') throw TypeError(`${city} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (email.match(/^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) throw Error(`${email} is an invalid email`)

        if (!name.trim()) throw new Error('name is empty or blank')
        if (!username.trim()) throw new Error('username is empty or blank')
        if (!email.trim()) throw new Error('email is empty or blank')
        if (!city.trim()) throw new Error('city is empty or blank')
        if (!password.trim()) throw new Error('password is empty or blank')

        return fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ name, username, password, email, city })
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })


    },

    loginUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new Error('username is empty or blank')
        if (!password.trim()) throw new Error('password is empty or blank')

        return fetch('http://localhost:5000/api/auth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                const { id, token } = res.data

                this._userId = id
                this._token = token
                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('token', token)

                return [id, token]
            })
    },

    logout() {
        this._user = ''
        this._userId = ''
        this._token = ''

        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
    },

    retrieveUser() {

        return fetch(`http://localhost:5000/api/users/${this._userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    updateUser(id, name, username, email, newPassword, password) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (email != null && typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!id.trim().length) throw new Error('id is empty or blank')
        if (name != null && !name.trim().length) throw new Error('name is empty or blank')
        if (email != null && !email.trim().length) throw new Error('email is empty or blank')
        if (username != null && !username.trim().length) throw new Error('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new Error('newPassword is empty or blank')
        if (!password.trim().length) throw new Error('password is empty or blank')


        return fetch(`http://localhost:5000/api/users/${this._userId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ id, name, username, email, newPassword, password })
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    retrieveProfile(_id) {

        if (typeof _id !== 'string') throw TypeError(`${_id} is not a string`)
        if (!_id.trim().length) throw new Error('id is empty or blank')

        return fetch(`http://localhost:5000/api/users/${_id}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    updateProfile(id, name, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching) {

        if (age != null && age != 'delete') age = Number(age)
        if (height != null && height != 'delete') height = Number(height)
        if (weight != null && weight != 'delete') weight = Number(weight)

        if (smoker != null && smoker != 'delete') smoker.includes('true') ? smoker = true : smoker = false
        if (moves != null && moves != 'delete') moves.includes('true') ? moves = true : moves = false
        if (receives != null && receives != 'delete') receives.includes('true') ? receives = true : receives = false

        if (typeof id !== 'number' || id == null || id == undefined) throw TypeError(`${id} is not a number`)
        if (age != null && age != 'delete' && typeof age !== 'number') throw TypeError(`${age} is not a number`)
        if (height != null && height != 'delete' && typeof height !== 'number') throw TypeError(`${height} is not a number`)
        if (weight != null && weight != 'delete' && typeof weight !== 'number') throw TypeError(`${weight} is not a number`)

        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (email != null && typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (skype != null && typeof skype !== 'string') throw TypeError(`${skype} is not a string`)
        if (gender != null && typeof gender !== 'string') throw TypeError(`${gender} is not a string`)
        if (description != null && description != 'delete' && typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (city != null && typeof city !== 'string') throw TypeError(`${city} is not a string`)

        if (smoker != null && smoker != 'delete' && typeof smoker !== 'boolean') throw TypeError(`${smoker} is not a boolean`)
        if (receives != null && receives != 'delete' && typeof receives !== 'boolean') throw TypeError(`${receives} is not a boolean`)
        if (moves != null && moves != 'delete' && typeof moves !== 'boolean') throw TypeError(`${moves} is not a boolean`)

        if (offer != null && !(offer instanceof Array)) throw TypeError(`${moves} is not an Array`)
        if (searching != null && !(searching instanceof Array)) throw TypeError(`${moves} is not an Array`)

        if (name != null && !name.trim().length) throw new Error('surname is empty or blank')
        if (email != null && !email.trim().length) throw new Error('surname is empty or blank')
        if (skype != null && !skype.trim().length) throw new Error('surname is empty or blank')
        if (gender != null && !gender.trim().length) throw new Error('surname is empty or blank')
        if (description != null && !description.trim().length) description = null
        if (city != null && !city.trim().length) throw new Error('surname is empty or blank')

        return fetch(`http://localhost:5000/api/users/${this._userId}/profile`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ id, name, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching })
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
            .catch(err => {
                return err.message
            })

    },

    search(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        return fetch(`http://localhost:5000/api/users/${this._userId}/search/${query}`, {
            method: 'GET',
            headers: {
                // "Content-Type": "application/json; charset=utf-8",
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return res.data
            })
            .catch(err => {
                return err.message
            })

    },

    uploadImage(file) {
        debugger
        let avatar = new FormData()

        avatar.append('image', file)

        return fetch(`http://localhost:5000/api/users/${this._userId}/profile/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this._token}`
            },
            body: avatar
        })
            .catch(err => { debugger })
            .then(res => res.json())
            .then(res => res.data)
    },

    deleteAccount() {
        return fetch(`http://localhost:5000/api/users/${this._userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    listConversations() {
        return fetch(`http://localhost:5000/api/users/${this._userId}/conversations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
            .catch(err => {
                return err.message
            })
    },

    listChats(user2_id) {

        return fetch(`http://localhost:5000/api/users/${this._userId}/messages/${user2_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
            .catch(err => {
                return err.message
            })
    },

    sendMessage(user2_id, text) {

        return fetch(`http://localhost:5000/api/users/${this._userId}/messages/${user2_id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': `Bearer ${this._token}`,
            },
            body: JSON.stringify({ text })
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
            .catch(err => {
                return err.message
            })
    },

    checkExisitingConversation(user2_id){

        return fetch(`http://localhost:5000/api/users/${user2_id}/profile/chat/${this._userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
            .catch(err => {
                return err.message
            })
    }
}


// export default logic
module.exports = logic