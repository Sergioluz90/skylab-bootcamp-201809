const { Sequelize, models: { User, Offer, Searching, Blocked, Message, Conversation } } = require('final-data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')
const { env: { CLOUDINARY_CONFIG_NAME, CLOUDINARY_CONFIG_KEY, CLOUDINARY_CONFIG_API_SECRET } } = process
"use strict"

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: CLOUDINARY_CONFIG_NAME,
    api_key: CLOUDINARY_CONFIG_KEY,
    api_secret: CLOUDINARY_CONFIG_API_SECRET
})

const logic = {

    /**
     * Register a user
     * @param {string} name 
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @param {string} city 
     */
    registerUser(name, username, password, email, city) {

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof city !== 'string') throw TypeError(`${city} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')
        if (!email.trim()) throw new ValueError('email is empty or blank')
        if (!city.trim()) throw new ValueError('city is empty or blank')

        if (email.match(/^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) throw Error(`${email} is an invalid email`)


        return (async () => {

            let _user = await User.findOne({ where: { username: username } })

            if (_user) throw new AlreadyExistsError('This username already exists')

            _user = await User.findOne({ where: { email: email } })

            if (_user) throw new AlreadyExistsError('This email already exists')

            const user = User.build({
                username: username,
                name: name,
                password: password,
                email: email,
                city: city
            }, { logging: false })

            await user.save()

        })()
    },

    /**
     * Checks if user exists and returns its id
     * @param {string} username 
     * @param {string} password 
     * @returns {number} id of the user
     */
    authenticateUser(username, password) {

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            const user = await User.findOne({ where: { username: username }, logging: false })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.dataValues.id
        })()

    },

    /**
     * Find a user and return its id, name, username and email
     * @param {string} _id 
     * @returns {object} object with all the information
     */
    retrieveUser(_id) {

        if (typeof _id !== 'string') throw TypeError(`${_id} is not a string`)
        if (!_id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            const user = await User.findByPk(_id, { logging: false })

            const { id, name, username, email } = user

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const _user = ({ id, name, username, email })

            return _user
        })()
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
     */
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


        return (async () => {

            const user = await User.findByPk(id, { logging: false })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findOne({ where: { username: username }, logging: false })

                if (_user && _user.username !== user.username) throw new AlreadyExistsError(`username ${username} already exists`)

                name != null && (user.name = name)
                email != null && (user.email = email)
                user.username = username
                newPassword != null && (user.password = newPassword)

                await user.save({ logging: false })

            } else {
                name != null && (user.name = name)
                email != null && (user.email = email)
                newPassword != null && (user.password = newPassword)

                await user.save({ logging: false })
            }
        })()
    },

    /**
     * It find a user by id and returns its id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching and profileImage
     * @param {string} _id 
     * @returns {object} object with all the information of the user
     */
    retrieveProfile(_id) {

        let _user

        if (typeof _id !== 'string') throw TypeError(`${_id} is not a string`)
        if (!_id.trim().length) throw new ValueError('id is empty or blank')


        return (async () => {

            const user = await User.findByPk(_id, { logging: false })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const { id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, profileImage } = user

            const offers = await Offer.findAll({ where: { user_id: _id }, logging: false })
            let offer = []

            offers.forEach(off => {
                offer.push(off.lenguage)
            })

            const searchings = await Searching.findAll({ where: { user_id: _id }, logging: false })
            let searching = []

            searchings.forEach(search => {
                searching.push(search.lenguage)
            })

            _user = ({ id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching, profileImage })

            return _user
        })()
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
     * @param {boolean} smoker (optional)
     * @param {string} description (optional)
     * @param {boolean} receives (optional)
     * @param {boolean} moves (optional)
     * @param {string} city (optional)
     * @param {Array} offer (optional)
     * @param {Array} searching (optional)
     */
    updateProfile(id, name, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching) {

        if (typeof id !== 'string' || id == null || id == undefined) throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (age != null && age != 'delete' && age != 'delete' && typeof age !== 'number') throw TypeError(`${age} is not a number`)
        if (height != null && height != 'delete' && typeof height !== 'number') throw TypeError(`${height} is not a number`)
        if (weight != null && weight != 'delete' && typeof weight !== 'number') throw TypeError(`${weight} is not a number`)

        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (email != null && typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (skype != null && skype != 'delete' && typeof skype !== 'string') throw TypeError(`${skype} is not a string`)
        if (gender != null && gender != 'delete' && typeof gender !== 'string') throw TypeError(`${gender} is not a string`)
        if (description != null && description != 'delete' && typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (city != null && typeof city !== 'string') throw TypeError(`${city} is not a string`)

        if (smoker != null && smoker != 'delete' && typeof smoker !== 'boolean') throw TypeError(`${smoker} is not a boolean`)
        if (receives != null && receives != 'delete' && typeof receives !== 'boolean') throw TypeError(`${receives} is not a boolean`)
        if (moves != null && moves != 'delete' && typeof moves !== 'boolean') throw TypeError(`${moves} is not a boolean`)

        if (offer != null && !(offer instanceof Array)) throw TypeError(`${moves} is not an Array`)
        if (searching != null && !(searching instanceof Array)) throw TypeError(`${moves} is not an Array`)

        if (name != null && !name.trim().length) throw new ValueError('name is empty or blank')
        if (email != null && !email.trim().length) throw new ValueError('email is empty or blank')
        if (skype != null && !skype.trim().length) throw new ValueError('skype is empty or blank')
        if (gender != null && !gender.trim().length) throw new ValueError('gender is empty or blank')
        if (description != null && !description.trim().length) throw new ValueError('description is empty or blank')
        if (city != null && !city.trim().length) throw new ValueError('city is empty or blank')

        if (offer != null && !offer.length) offer = null
        if (searching != null && !searching.length) searching = null

        return (async () => {
            const user = await User.findByPk(id, { logging: false })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            name != null && (user.name = name)
            email != null && (user.email = email)
            skype != null && ((skype !== 'delete') ? user.skype = skype : user.skype = null)
            age != null && ((age !== 'delete') ? user.age = age : user.age = null)
            gender != null && ((gender !== 'delete') ? user.gender = gender : user.gender = null)
            height != null && ((height !== 'delete') ? user.height = height : user.height = null)
            weight != null && ((weight !== 'delete') ? user.weight = weight : user.weight = null)
            smoker != null && ((smoker !== 'delete') ? user.smoker = smoker : user.smoker = null)
            description != null && ((description !== 'delete') ? user.description = description : user.description = null)
            receives != null && (user.receives = receives)
            moves != null && (user.moves = moves)
            city != null && (user.city = city)

            await user.save({ logging: false })

            async function f_updating(updating, model) {

                if (updating) {

                    for (off of updating) {

                        const _search = await model.findAll({ where: { lenguage: off, user_id: id }, subQuery: false, attributes: ['id', 'lenguage'], logging: false })
                        if (_search[0]) {
                            await _search[0].destroy({ force: true, logging: false })
                        } else {
                            await model.create({ user_id: id, lenguage: off }, { logging: false })
                        }
                    }
                }
            }

            await f_updating(offer, Offer)
            await f_updating(searching, Searching)
        })()
    },

    /**
     * It search users by query received
     * It will exclude the user that has 'sub' id
     * @param {string} query 
     * @param {string} sub 
     * @returns {Array} list of users
     */
    search(query, sub) {

        if (typeof query !== 'string' || query == null || query == undefined) throw TypeError(`${query} is not a string`)
        if (query != null && !query.trim().length) throw new ValueError('query is empty or blank')

        if (typeof sub !== 'string' || sub == null || sub == undefined) throw TypeError(`${sub} is not a string`)
        if (sub != null && !sub.trim().length) throw new ValueError('sub is empty or blank')
        
        let objects = []
        const res = query.split('&')

        res.forEach(elem => {
            if (res !== '') {
                let res = elem.split('=')
                let type = res[0]
                let src = res[1]
                let obj = { type: type, src: src }
                objects.push(obj)
            }
        })

        let username = '', offer, searching, minAge = 0, maxAge = 100, gender, smoker, city

        objects.forEach(obj => {
            if (obj.type === 'username') username = obj.src
            if (obj.type === 'offer') { offer = obj.src.split('+') }
            if (obj.type === 'searching') { searching = obj.src.split('+') }
            if (obj.type === 'gender') gender = obj.src
            if (obj.type === 'minAge') minAge = Number(obj.src)
            if (obj.type === 'maxAge') maxAge = Number(obj.src)
            if (obj.type === 'city') city = obj.src
            if (obj.type === 'smoker') {
                if (obj.src === 'true') smoker = true
                else smoker = false
            }
        })

        let obj = {
            where: {
                username: { like: '%' + username + '%' },
                city: { like: '%' + city + '%' },
                id: { [Sequelize.Op.not]: [sub] },
                age: {
                    [Sequelize.Op.or]: [
                        { [Sequelize.Op.between]: [minAge, maxAge] },
                        { like: null }
                    ]
                },
                gender: gender,
                smoker: smoker,
            },
            include: [{
                model: Offer,
                as: 'userOffers',
                where: {
                    lenguage: { [Sequelize.Op.or]: offer }
                }
            },
            {
                model: Searching,
                as: 'userSearchings',
                where: {
                    lenguage: { [Sequelize.Op.or]: searching }
                }
            }]
            , logging: false
        }

        return (async () => {
            
            let query
            if (offer == null) {
                query = obj.include.filter(item => item.model !== Offer)
                obj.include = query
            }
            
            if (searching == null) {
                query = obj.include.filter(item => item.model !== Searching)
                obj.include = query
            }
            
            if (username === '') delete obj.where.username
            if (gender == null) delete obj.where.gender
            if (smoker == null) delete obj.where.smoker
            if (minAge === 0 && maxAge === 100) delete obj.where.age
            if (city == null) delete obj.where.city
            
            
            const users = await User.findAll(obj)
            
            let user_list = []
            
            for (user of users) {
                let { id, username, age, gender, description, userOffers, userSearchings, city, profileImage , smoker} = user
                
                if (userOffers == undefined) userOffers = []
                if (userSearchings == undefined) userSearchings = []
                
                const _user = { id, username, age, gender, description, userOffers, userSearchings, city, profileImage, smoker }
                
                user_list.push(_user)
            }
            return user_list
        })()
    },

    /**
     * Uploads a image in Cloudinary server and saves in a user (profileImage) the url
     * User is found by id 
     * @param {object} file 
     * @param {string} user_id 
     */
    insertProfileImage(file, user_id) {

        return (async () => {
            let user = await User.findOne({ where: { id: user_id } })

            if (!user) throw new NotFoundError(`User does not exist`)

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((result, error) => {
                    if (error) return reject(error)

                    resolve(result)
                })

                file.pipe(stream)
            })

            user.profileImage = result.url

            await user.save()

        })()
    },

    /**
     * Delete a user and all the information that has associated in other models
     * @param {string} id 
     */
    deleteAccount(id) {

        if (typeof id !== 'string' || id == null || id == undefined) throw TypeError(`${id} is not a string`)
        if (id != null && !id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            let user = await User.findOne({ where: { id: id }, logging:false })
            if (!user) throw new NotFoundError(`User does not exist`)

            let conversations = await Conversation.findAll({
                where: {
                    [Sequelize.Op.or]: [{ user1_id: id }, { user2_id: id }]
                },
                logging:false
            })
            let messages = await Message.findAll({
                where: {
                    [Sequelize.Op.or]: [{ sender_id: id }, { receiver_id: id }]
                },
                logging:false
            })

            for (let i = 0; i < conversations.length; i++) {
                await conversations[i].destroy({where:{},logging:false})
            }

            for (let i = 0; i < messages.length; i++) {
                await messages[i].destroy({where:{},logging:false})
            }

            await user.destroy({where:{},logging:false})

        })()
    },

    /**
     * Search if exist a conversation between two users.
     * If not exists it creates one.
     * Then creates a message between the two users
     * @param {string} sender_id 
     * @param {string} receiver_id 
     * @param {string} text 
     * @param {object} date (optional)
     */
    sendMessage(sender_id, receiver_id, text, date) {

        if (typeof sender_id !== 'string' || sender_id == null || sender_id == undefined) throw TypeError(`${sender_id} is not a string`)
        if (sender_id != null && !sender_id.trim().length) throw new ValueError('sender_id is empty or blank')

        if (typeof receiver_id !== 'string' || receiver_id == null || receiver_id == undefined) throw TypeError(`${receiver_id} is not a string`)
        if (receiver_id != null && !receiver_id.trim().length) throw new ValueError('receiver_id is empty or blank')

        if (typeof text !== 'string' || text == null || text == undefined) throw TypeError(`${text} is not a string`)
        if (text != null && !text.trim().length) throw new ValueError('text is empty or blank')

        return (async () => {

            const message = Message.build({
                sender_id: sender_id,
                receiver_id: receiver_id,
                text: text
            }, { logging: false })

            if (date) message.createdAt = date

            await message.save({ logging: false })

            const conversations = await Conversation.findAll({
                where: {
                    [Sequelize.Op.or]: [{
                        user1_id: sender_id,
                        user2_id: receiver_id,
                    },
                    {
                        user2_id: sender_id,
                        user1_id: receiver_id,
                    }]
                }, logging: false
            })

            const conversation = conversations[0]

            conversation ? null : await Conversation.create({ user1_id: sender_id, user2_id: receiver_id }, { logging: false })

        })()
    },

    /**
     * Search all the messages between two users and returns them
     * @param {string} user1_id 
     * @param {string} user2_id 
     * @returns {Array} list of messages
     */
    listChats(user1_id, user2_id) {
        
        if (typeof user1_id !== 'string' || user1_id == null || user1_id == undefined) throw TypeError(`${user1_id} is not a string`)
        if (user1_id != null && !user1_id.trim().length) throw new ValueError('user1_id is empty or blank')

        if (typeof user2_id !== 'string' || user2_id == null || user2_id == undefined) throw TypeError(`${user2_id} is not a string`)
        if (user2_id != null && !user2_id.trim().length) throw new ValueError('user2_id is empty or blank')

        return (async () => {

            let messages = await Message.findAll({
                where: {
                    [Sequelize.Op.or]: [{
                        sender_id: user1_id,
                        receiver_id: user2_id
                    },
                    {
                        sender_id: user2_id,
                        receiver_id: user1_id
                    }]
                },
                order: [['createdAt', 'ASC'],],
                logging: false
            })

            let list = []

            function returnTime(date) {
                function zeroFill(i) {
                    return (i < 10 ? '0' : '') + i
                }
                let time = ''
                time += zeroFill(date.getFullYear()) + '-'
                time += zeroFill(date.getMonth() + 1) + '-'
                time += zeroFill(date.getDate()) + ' '
                time += zeroFill(date.getHours()) + ':'
                time += zeroFill(date.getMinutes()) + '\n'

                return time
            }

            for (message of messages) {

                if (message.read === false && message.sender_id.toString() !== user1_id) {
                    message.read = true
                    message.save({ logging: false })
                }

                let { id, sender_id, receiver_id, text, read, createdAt } = message

                createdAt = returnTime(createdAt)

                const _message = { id, sender_id, receiver_id, text, read, createdAt }

                list.push(_message)
            }
            return list
        })()
    },

    /**
     * List the conversations of a user
     * @param {string} user1__id 
     * @returns {Array} list of conversations
     */
    listConversations(user1__id) {

        if (typeof user1__id !== 'string' || user1__id == null || user1__id == undefined) throw TypeError(`${user1__id} is not a string`)
        if (user1__id != null && !user1__id.trim().length) throw new ValueError('user1_id is empty or blank')

        return (async () => {

            const conversations = await Conversation.findAll({
                where: {
                    [Sequelize.Op.or]: [{
                        user1_id: user1__id,
                    },
                    {
                        user2_id: user1__id,
                    }],
                },
                attributes: ['user1_id', 'user2_id'],
                include: [{
                    model: User,
                    attributes: ['id', 'username', 'profileImage']
                }],
                logging: false
            })

            let list = []

            for (conversation of conversations) {
                let { user1_id, user2_id } = conversation
                let { username, profileImage, id } = conversation.user

                if (id.toString() === user1__id) {
                    const user2 = await User.findOne({ where: { id: user1_id }, attributes: ['username', 'profileImage'], logging: false })
                    username = user2.username
                    profileImage = user2.profileImage
                }
                const convers = { user1_id, user2_id, user2_username: username, profileImage }
                list.push(convers)
            }
            return list
        })()
    },

    /**
     * Checks if a user has a conversation with an other user
     * @param {string} user1__id 
     * @param {string} user2__id 
     * @returns {Boolean} true if it exists
     */
    checkExistingConversation(user1__id, user2__id) {

        if (typeof user1__id !== 'string' || user1__id == null || user1__id == undefined) throw TypeError(`${user1__id} is not a string`)
        if (user1__id != null && !user1__id.trim().length) throw new ValueError('user1_id is empty or blank')

        if (typeof user2__id !== 'string' || user2__id == null || user2__id == undefined) throw TypeError(`${user2__id} is not a string`)
        if (user2__id != null && !user2__id.trim().length) throw new ValueError('user2__id is empty or blank')

        return (async () => {

            const conversations = await Conversation.findAll({
                where: {
                    [Sequelize.Op.or]: [{
                        user1_id: user1__id,
                        user2_id: user2__id,
                    },
                    {
                        user2_id: user1__id,
                        user1_id: user2__id,
                    }],
                },
                logging: false
            })

            let response = false
            if (conversations.length > 0) response = true
            return response
        })()
    }
}

module.exports = logic