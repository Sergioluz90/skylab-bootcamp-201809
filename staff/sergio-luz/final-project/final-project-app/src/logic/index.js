const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const logic = {

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
            body: JSON.stringify({ name, username, password,email })
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    loginUser( username, password) {
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

                debugger
                return res.data
            })
    }

}


// export default logic
module.exports=logic