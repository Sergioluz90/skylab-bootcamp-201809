const { Sequelize, models: { User, Offer, Searching, Blocked } } = require('final-data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const logic = {
    registerUser(name, username, password, email) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')
        if (!email.trim()) throw new ValueError('email is empty or blank')

        return (async () => {

            const user = User.build({
                username: username,
                name: name,
                password: password,
                email: email
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

                if (_user[0]) throw new AlreadyExistsError(`username ${username} already exists`)

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

    updateProfile(id, email, skype, age, gender, height, weight, smoker, description, receives, moves, city, offer, searching) {

        if (typeof id !== 'number' || id == null || id == undefined) throw TypeError(`${id} is not a number`)
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

        if (email != null && !email.trim().length) throw new ValueError('surname is empty or blank')
        if (skype != null && !skype.trim().length) throw new ValueError('surname is empty or blank')
        if (gender != null && !gender.trim().length) throw new ValueError('surname is empty or blank')
        if (description != null && !description.trim().length) throw new ValueError('surname is empty or blank')
        if (city != null && !city.trim().length) throw new ValueError('surname is empty or blank')

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

                for (off of updating) {

                    const _search = await model.findAll({ subQuery: false, attributes: ['id', 'lenguage'], logging: false })

                    if (_search[0]) {

                        await _search[0].destroy({ force: true, logging: false })
                    } else {

                        await model.create({ user_id: id, lenguage: off }, { logging: false })
                    }
                }
            }

            await f_updating(offer, Offer)
            await f_updating(searching, Searching)
        })()
    },

    search(username, offer, searching) {
        // if (typeof username !== 'string') throw TypeError(`${username} is not a string`)

        // if (!username.trim()) throw new ValueError('username is empty or blank')

        if (offer == null) offer = ['%']
        if (searching == null) searching = ['%']

        return (async () => {
            debugger

            const users = await User.findAll({
                where: {
                    [Sequelize.Op.and]: {
                        username: {
                            [Sequelize.Op.like]: '%' + username + '%'
                        },

                        
                        '$userOffers.lenguage$':{[Sequelize.Op.or]:['spanish','chinese']}
                         
                    }

                }
                ,
                include: [{
                    model: Offer,
                    as: 'userOffers'
                }, {
                    model: Searching,
                    as: 'userSearchings'
                }]
                , logging: true
            })


            const users2 = await User.findAll({ where: { username: username } })



            // FUNCIONA VERSION 1.0.1

            // const users = await User.findAll({
            //     where: {
            //         [Sequelize.Op.and]: {
            //             username: {
            //                 [Sequelize.Op.like]: '%'+username+'%'
            //             },
            //             '$userOffers.lenguage$':offer
            //         }
            //     },
            //     include: [{
            //         model: Offer,
            //         as: 'userOffers'
            //     },{
            //         model:Searching,
            //         as:'userSearchings'
            //     }]
            //     , logging: true
            // })


            // FUNCIONA: VERSION 1.0.0

            // const users = await User.findAll({
            //     where: {
            //         [Sequelize.Op.and]: {
            //             username: {
            //                 [Sequelize.Op.like]: '%'+username
            //             }
            //         }
            //     },
            //     include: [{
            //         model: Offer,
            //         as: 'userOffers'
            //     }]
            //     , logging: true
            // })

            //NO FUNCIONA:

            // const users = await User.findAll({ where:{username}
            //     // [Sequelize.Op.or]: [
            //     //     where: { username: { like: '%' + username + '%' } },
            //     //     include: [{
            //     //         model: Offer,
            //     //         as: 'userOffers',
            //     //         where: {
            //     //             lenguage: { [Sequelize.Op.or]: offer }
            //     //         }
            //     //     },
            //     //     {
            //     //         model: Searching,
            //     //         as: 'userSearchings',
            //     //         where: {
            //     //             lenguage: { [Sequelize.Op.or]: searching }
            //     //         }
            //     //     }]]
            //     , logging: false
            // })

            let user_list = []

            debugger

            for (user of users) {

                const { id, age, gender, description, userOffers, userSearchings } = user

                const _user = { id, username, age, gender, description, userOffers, userSearchings }

                user_list.push(_user)
            }

            return user_list
        })()
    }
}

module.exports = logic