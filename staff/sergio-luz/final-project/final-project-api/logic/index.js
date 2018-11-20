const { User } = require('../data')
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
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.dataValues.id
        })()

    },

    retrieveUser(_id) {
        const ID = _id
        let _user

        if (typeof _id !== 'number') throw TypeError(`${_id} is not a number`)

        return (async () => {

            const user = await User.findById(ID)

            const { id, name, username, email } = user

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            _user = ({ id, name, username, email })

            return _user
        })()
    },

    updateUser(id, name, username, email, newPassword, password) {

        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)
        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (email != null && typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (name != null && !name.trim().length) throw new ValueError('name is empty or blank')
        if (email != null && !email.trim().length) throw new ValueError('surname is empty or blank')
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')


        return (async () => {

            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findAll({ where: { username: username } })

                if (_user[0]) throw new AlreadyExistsError(`username ${username} already exists`)

                name != null && (user.name = name)
                email != null && (user.email = email)
                user.username = username
                newPassword != null && (user.password = newPassword)

                await user.save()
            } else {
                name != null && (user.name = name)
                email != null && (user.email = email)
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },

    retrieveProfile(_id) {
        const ID = _id
        let _user

        if (typeof _id !== 'number') throw TypeError(`${_id} is not a number`)

        return (async () => {

            const user = await User.findById(ID)

            const { id, name, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city } = user

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            _user = ({ id,name,  username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city  })

            return _user
        })()
    },

    updateProfile(id, username, email, skype, age, gender, height, weight, smoker, description, receives, moves, city) {

        if (typeof id !== 'number' || id==null || id==undefined) throw TypeError(`${id} is not a number`)
        if (age!=null && typeof age !== 'number') throw TypeError(`${age} is not a number`)
        if (height!=null &&typeof height !== 'number') throw TypeError(`${height} is not a number`)
        if (weight!=null &&typeof weight !== 'number') throw TypeError(`${weight} is not a number`)

        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (email != null && typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (skype != null && typeof skype !== 'string') throw TypeError(`${skype} is not a string`)
        if (gender != null && typeof gender !== 'string') throw TypeError(`${gender} is not a string`)
        if (description != null && typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (city != null && typeof city !== 'string') throw TypeError(`${city} is not a string`)
        
        if (smoker != null && typeof smoker !== 'boolean') throw TypeError(`${smoker} is not a boolean`)
        if (receives != null && typeof receives !== 'boolean') throw TypeError(`${receives} is not a boolean`)
        if (moves != null && typeof moves !== 'boolean') throw TypeError(`${moves} is not a boolean`)

        if (username != null && !username.trim().length) throw new ValueError('surname is empty or blank')
        if (email != null && !email.trim().length) throw new ValueError('surname is empty or blank')
        if (skype != null && !skype.trim().length) throw new ValueError('surname is empty or blank')
        if (gender != null && !gender.trim().length) throw new ValueError('surname is empty or blank')
        if (description != null && !description.trim().length) throw new ValueError('surname is empty or blank')
        if (city != null && !city.trim().length) throw new ValueError('surname is empty or blank')

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            email!=null && (user.email=email)
            skype!=null && (user.skype=skype)
            age!=null && (user.age=age)
            gender!=null && (user.gender=gender)
            height!=null && (user.height=height)
            weight!=null && (user.weight=weight)
            smoker!=null && (user.smoker=smoker)
            description!=null && (user.description=description)
            receives!=null && (user.receives=receives)
            moves!=null && (user.moves=moves)
            city!=null && (user.city=city)

            await user.save()

        })()
    }
}

module.exports = logic