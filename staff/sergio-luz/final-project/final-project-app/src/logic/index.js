const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')
global.sessionStorage = require('sessionstorage')


const logic = {
    
    _user: "",
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,
    
    registerUser(name, username, password, email) {
        
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!email.trim()) throw new ValueError('email is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ name, username, password, email })
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

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

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

            })
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

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (name != null && !name.trim().length) throw new ValueError('name is empty or blank')
        if (email != null && !email.trim().length) throw new ValueError('email is empty or blank')
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')


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
        if (!_id.trim().length) throw new ValueError('id is empty or blank')

        return fetch(`http://localhost:5000/api/users/${this._userId}/profile`, {
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
    }

}


// export default logic
module.exports = logic