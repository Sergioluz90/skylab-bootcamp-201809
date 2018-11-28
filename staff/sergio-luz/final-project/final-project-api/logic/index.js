const { Sequelize, models: { User, Offer, Searching, Blocked } } = require('final-data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const logic = {
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


        return (async () => {

            const _user = await User.find({ where: { username: username } })

            if (_user) throw new AlreadyExistsError('This username already exists')

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

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            const users = await User.findAll({ where: { username: username }, logging: false })

            const user = users[0]

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.dataValues.id
        })()

    },

    retrieveUser(_id) {
        const ID = _id
        let _user

        if (typeof _id !== 'string') throw TypeError(`${_id} is not a string`)
        if (!_id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            const user = await User.findById(ID)

            const { id, name, username, email } = user

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            _user = ({ id, name, username, email })

            return _user
        })()
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


        return (async () => {

            const user = await User.findById(id, { logging: false })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findAll({ where: { username: username }, logging: false })

                if (_user[0] && _user[0].username !== user.username) throw new AlreadyExistsError(`username ${username} already exists`)

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

    retrieveProfile(_id) {
        const ID = _id
        let _user

        if (typeof _id !== 'string') throw TypeError(`${_id} is not a string`)
        if (!_id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            const user = await User.findByPk(ID, { logging: false })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const { id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city } = user

            const offers = await Offer.findAll({ where: { user_id: ID }, logging: false })
            let offer = []

            offers.forEach(off => {
                offer.push(off.lenguage)
            })

            const searchings = await Searching.findAll({ where: { user_id: ID }, logging: false })
            let searching = []

            searchings.forEach(search => {
                searching.push(search.lenguage)
            })

            _user = ({ id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching })

            return _user
        })()
    },

    updateProfile(id, email, skype, gender, age, height, weight, smoker, description, receives, moves, city, offer, searching) {

        if (typeof id !== 'string' || id == null || id == undefined) throw TypeError(`${id} is not a string`)
        if (id != null && !id.trim().length) throw new ValueError('id is empty or blank')

        if (age != null && typeof age !== 'number') throw TypeError(`${age} is not a number`)
        if (height != null && typeof height !== 'number') throw TypeError(`${height} is not a number`)
        if (weight != null && typeof weight !== 'number') throw TypeError(`${weight} is not a number`)

        if (email != null && typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (skype != null && typeof skype !== 'string') throw TypeError(`${skype} is not a string`)
        if (gender != null && typeof gender !== 'string') throw TypeError(`${gender} is not a string`)
        if (description != null && typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (city != null && typeof city !== 'string') throw TypeError(`${city} is not a string`)

        if (smoker != null && typeof smoker !== 'boolean') throw TypeError(`${smoker} is not a boolean`)
        if (receives != null && typeof receives !== 'boolean') throw TypeError(`${receives} is not a boolean`)
        if (moves != null && typeof moves !== 'boolean') throw TypeError(`${moves} is not a boolean`)

        if (offer != null && !(offer instanceof Array)) throw TypeError(`${moves} is not an Array`)

        if (email != null && !email.trim().length) throw new ValueError('email is empty or blank')
        if (skype != null && !skype.trim().length) throw new ValueError('skype is empty or blank')
        if (gender != null && !gender.trim().length) throw new ValueError('gender is empty or blank')
        if (description != null && !description.trim().length) throw new ValueError('description is empty or blank')
        if (city != null && !city.trim().length) throw new ValueError('city is empty or blank')

        if (offer != null && !offer.length) throw new ValueError('offer is empty')


        return (async () => {
            const user = await User.findById(id, { logging: false })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            email != null && (user.email = email)
            skype != null && (user.skype = skype)
            age != null && (user.age = age)
            gender != null && (user.gender = gender)
            height != null && (user.height = height)
            weight != null && (user.weight = weight)
            smoker != null && (user.smoker = smoker)
            description != null && (user.description = description)
            receives != null && (user.receives = receives)
            moves != null && (user.moves = moves)
            city != null && (user.city = city)

            await user.save({ logging: false })

            async function f_updating(updating, model) {

                if (updating) {

                    for (off of updating) {

                        const _search = await model.findAll({ subQuery: false, attributes: ['id', 'lenguage'], logging: false })

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

    search(query, sub) {

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

        let username = '', offer, searching, minAge = 0, maxAge = 100, gender, smoker

        objects.forEach(obj => {
            if (obj.type === 'q') username = obj.src
            if (obj.type === 'offer') { offer = obj.src.split('+') }
            if (obj.type === 'searching') { searching = obj.src.split('+') }
            if (obj.type === 'gender') gender = obj.src
            if (obj.type === 'minAge') minAge = Number(obj.src)
            if (obj.type === 'maxAge') maxAge = Number(obj.src)
            if (obj.type === 'smoker') {
                if (obj.src === 'true') smoker = true
                else smoker = false
            }
        })

        debugger

        let obj = {
            where: {
                username: { like: '%' + username + '%' },
                id: { [Sequelize.Op.not]: [sub] },
                age: {
                    [Sequelize.Op.or]: [
                        { [Sequelize.Op.between]: [minAge, maxAge] },
                        { like: null }
                    ]
                },
                gender: gender,
                smoker: smoker
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

        debugger

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

            debugger

            const users = await User.findAll(obj)

            debugger
            let user_list = []

            for (user of users) {
                let { id, username, age, gender, description, userOffers, userSearchings } = user

                if (userOffers == undefined) userOffers = []
                if (userSearchings == undefined) userSearchings = []

                const _user = { id, username, age, gender, description, userOffers, userSearchings }

                user_list.push(_user)
            }
            return user_list
        })()
    }
}

module.exports = logic