global.sessionStorage = require('sessionstorage')


const logic = {

    _user: "",
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,

    /**
     * Returns true if user is logged in
     * @returns {boolean}
     */
    get loggedIn() {
        return !!sessionStorage.getItem('userId')
    },

    /**
     * Returns the id of the user if is logged in
     * @returns {string}
     */
    get myId() {
        return sessionStorage.getItem('userId')
    },

    /**
     * Register a user
     * @param {string} name 
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @param {string} city 
     * @returns {string} API message
     */
    registerUser(name, username, password, email, city ) {

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof city !== 'string') throw TypeError(`${city} is not a string`)

        if (!name.trim()) throw new Error('name is empty or blank')
        if (!username.trim()) throw new Error('username is empty or blank')
        if (!password.trim()) throw new Error('password is empty or blank')
        if (!email.trim()) throw new Error('email is empty or blank')
        if (!city.trim()) throw new Error('city is empty or blank')

        if (email.match(/^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) throw Error(`${email} is an invalid email`)


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

    /**
     * Checks if user exists and returns its id
     * @param {string} username 
     * @param {string} password 
     * @returns {string} id of the user
     * @returns {string} token of the session
     */
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

    /**
     * Removes all the information of sessionStorage
     */
    logout() {
        this._user = ''
        this._userId = ''
        this._token = ''

        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
    },

    /**
     * Find a user and return its id, name, username and email
     * @returns {object} object with all the information
     */
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

    /**
     * Find a user by id and overwrite its name, username, emai and password. 
     * It will only overwrite params that are not null
     * @param {string} id 
     * @param {string} name (optional)
     * @param {string} username (optional)
     * @param {string} email (optional)
     * @param {string} newPassword (optional)
     * @param {string} password 
     * @returns {string} Api message
     */
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

    /**
     * It find a user by id and returns its id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching and profileImage
     * @param {string} _id 
     * @returns {object} object with all the information of the user
     */
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

    /**
     * It find a user by id and overwrite name, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer and searching params.
     * It will overwrite params that are not null
     * @param {string} id 
     * @param {string} name (optional)
     * @param {string} email (optional)
     * @param {string} skype (optional)
     * @param {number} age (optional)
     * @param {string} gender (optional)
     * @param {number} height (optional)
     * @param {number} weight (optional)
     * @param {string} smoker (optional)
     * @param {string} description (optional)
     * @param {string} receives (optional)
     * @param {string} moves (optional)
     * @param {string} city (optional)
     * @param {Array} offer (optional)
     * @param {Array} searching (optional)
     * @returns {string} API message
     */
    updateProfile(id, name, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching) {

        if (age != null && age != 'delete') age = Number(age)
        if (height != null && height != 'delete') height = Number(height)
        if (weight != null && weight != 'delete') weight = Number(weight)

        if (smoker != null && smoker != 'delete') smoker.includes('true') ? smoker = true : smoker = false
        if (moves != null && moves != 'delete') moves.includes('true') ? moves = true : moves = false
        if (receives != null && receives != 'delete') receives.includes('true') ? receives = true : receives = false

        if (typeof id !== 'string' || id == null || id == undefined) throw TypeError(`${id} is not a string`)
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

        if (id != null && !id.trim().length) throw new Error('id is empty or blank')
        if (name != null && !name.trim().length) throw new Error('name is empty or blank')
        if (email != null && !email.trim().length) throw new Error('email is empty or blank')
        if (skype != null && !skype.trim().length) throw new Error('skype is empty or blank')
        if (gender != null && !gender.trim().length) throw new Error('gender is empty or blank')
        if (description != null && !description.trim().length) description = null
        if (city != null && !city.trim().length) throw new Error('city is empty or blank')

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

    /**
     * It search users by query received
     * It will exclude the user that has 'sub' id
     * @param {string} query 
     * @param {string} sub 
     * @returns {Array} list of users
     */
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

    /**
     * Uploads a image in Cloudinary server and saves in a user (profileImage) the url
     * User is found by id 
     * @param {object} file 
     * @returns {string} Api message
     */
    uploadImage(file) {
        
        let avatar = new FormData()

        avatar.append('image', file)

        return fetch(`http://localhost:5000/api/users/${this._userId}/profile/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this._token}`
            },
            body: avatar
        })
            .then(res => res.json())
            .then(res => res.data)
    },

    /**
     * Delete a user and all the information that has associated in other models
     * @returns {string} API message
     */
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

    /**
     * List the conversations of a user
     * @returns {Array} list of conversations
     */
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

    /**
     * Search all the messages between two users and returns them
     * @param {string} user2_id 
     * @returns {Array} list of messages
     */
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

    /**
     * Search if exist a conversation between two users.
     * If not exists it creates one.
     * Then creates a message between the two users
     * @param {string} user2_id 
     * @param {string} text 
     * @returns {string} API message
     */
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

    /**
     * Checks if a user has a conversation with an other user
     * @param {string} user2_id 
     * @returns {Boolean} true if it exists
     */
    checkExisitingConversation(user2_id) {

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