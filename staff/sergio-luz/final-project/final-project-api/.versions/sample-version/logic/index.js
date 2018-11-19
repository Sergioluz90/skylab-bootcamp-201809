const { User, Postit } = require('../data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')
const {multer}=require('multer')

const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!surname.trim()) throw new ValueError('surname is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {

            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({ name, surname, username, password })

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

            return user.id
        })()

    },

    retrieveUser(_id) {
        const ID = _id
        let _user

        if (typeof _id !== 'string') throw TypeError(`${_id} is not a string`)

        if (!_id.trim().length) throw new ValueError('_id is empty or blank')

        return (async () => {

            const user = await User.findById(ID)

            const { id, name, surname, username } = user

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            _user = ({ id, name, surname, username })

            return _user
        })()


    },

    updateUser(id, name, surname, username, newPassword, password) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (surname != null && typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (name != null && !name.trim().length) throw new ValueError('name is empty or blank')
        if (surname != null && !surname.trim().length) throw new ValueError('surname is empty or blank')
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')


        return (async () => {

            const user = await User.findOne({ _id: id })

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findOne({ username })

                if (_user) throw new AlreadyExistsError(`username ${username} already exists`)

                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                user.username = username
                newPassword != null && (user.password = newPassword)

                await user.save()
            } else {
                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },

    addBuddy(userId, buddyUsername) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (typeof buddyUsername !== 'string') throw TypeError(`${buddyUsername} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')
        if (!buddyUsername.trim().length) throw new ValueError('buddyUsername is empty or blank')
        
        
        return (async () => {

            const buddy = await User.findOne({username:buddyUsername})

            if (!buddy) throw new NotFoundError(`username ${buddyUsername} not found`)

            const user = await User.findById(userId)
            
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            
            if(userId===buddy.id) throw new AuthError('UserId is the same as the collaborator')

            user.buddies.push(buddy._id)

            await user.save()
        })()
    },

    deleteBuddy(userId, buddyId){
        
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (typeof buddyId !== 'string') throw TypeError(`${buddyId} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')
        if (!buddyId.trim().length) throw new ValueError('buddyId is empty or blank')

        return (async()=>{

            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const buddy = await User.findById(buddyId)

            if (!buddy) throw new NotFoundError(`user with id ${buddyId} not found`)

            const newBuddies=user.buddies.filter(bud=> bud!=buddyId)

            user.buddies=newBuddies

            await user.save()
        })()
    },

    listBuddies(userId){

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')

        return (async () => {

            const user = await User.findById(userId, { password: 0, postits: 0, __v: 0 })
 
            let promises = []
 
            for (var i=0; i<user.buddies.length; i++) {
                promises.push(User.findById(user.buddies[i]))
            }
            return Promise.all(promises)
                .then(res => {
                    return res.map(item => item.username)
                })
 
        })()
    },
    /**
     * Adds a postit
     * 
     * @param {string} id The user id
     * @param {string} text The postit text
     * 
     * @throws {TypeError} On non-string user id, or non-string postit text
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */
    addPostit(id, text, status) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        if (typeof status !== 'string') throw TypeError(`${status} is not a string`)

        if (!status.trim().length) throw new ValueError('text is empty or blank')

        return (async () => {
            let user = User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const postit = new Postit({ text, status, user: id })

            await postit.save()
        })()
    },

    listPostits(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {

            const user = await User.findById(id)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const postits = await Postit.find({ user: user._id }).lean()

            postits.forEach(postit => {

                postit.id = postit._id.toString()

                delete postit._id

                postit.user = postit.user.toString()

                if(postit.assigned) postit.assigned= postit.assigned.toString()
            })
            
            return postits

        })()
    },

    /**
     * Removes a postit
     * 
     * @param {string} id The user id
     * @param {string} postitId The postit id
     * 
     * @throws {TypeError} On non-string user id, or non-string postit id
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id, or postit id
     */
    removePostit(id, postitId) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const postit = await Postit.findById(postitId)

            await Postit.deleteOne(postit)



        })()
    },

    modifyPostit(id, postitId, text, status) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        if (typeof status !== 'string') throw TypeError(`${status} is not a string`)

        if (!status.trim().length) throw new ValueError('text is empty or blank')

        return (async () => {

            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const postit = await Postit.findById(postitId)

            if (!postit) throw new NotFoundError(`postit with id ${postitId} not found`)

            postit.text = text
            postit.status = status

            await postit.save()
        })()
    },

    assignCollaborator(userId, postitId, collaboratorUsername){

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)
        if (typeof collaboratorUsername !== 'string') throw TypeError(`${collaboratorUsername} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')
        if (!postitId.trim().length) throw new ValueError('postitId is empty or blank')
        if (!collaboratorUsername.trim().length) throw new ValueError('collaboratorUsername is empty or blank')

        return (async () => {

            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const collaborator = await User.findOne({username:collaboratorUsername})

            if (!collaborator) throw new NotFoundError(`username ${collaboratorUsername} not found`)

            const postit = await Postit.findById(postitId)

            if (!postit) throw new NotFoundError(`postit with id ${postitId} not found`)

            postit.assigned=collaborator.id

            await postit.save()
        })()
        
    },
    
    unassignCollaborator(userId, postitId, collaboratorUsername){

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)
        if (typeof collaboratorUsername !== 'string') throw TypeError(`${collaboratorUsername} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')
        if (!postitId.trim().length) throw new ValueError('postitId is empty or blank')
        if (!collaboratorUsername.trim().length) throw new ValueError('collaboratorUsername is empty or blank')

        return (async () => {

            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const collaborator = await User.findOne({username:collaboratorUsername})

            if (!collaborator) throw new NotFoundError(`user with id ${collaboratorUsername} not found`)

            const postit = await Postit.findById(postitId)

            if (!postit) throw new NotFoundError(`postit with id ${postitId} not found`)

            postit.assigned=null

            await postit.save()
        })()
        
    },

    listAssignedPostits(userId){

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')

        return (async () => {

            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            let postits = await Postit.find({assigned:userId}).lean()

            postits.forEach(postit => {

                postit.id = postit._id.toString()

                delete postit._id

                postit.user = postit.user.toString()

                if(postit.assigned) postit.assigned= postit.assigned.toString()
            })

            return postits
        })()
        
    },

    uploadImage(userId, file){
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new ValueError('userId is empty or blank')

        fs.writeFile('image.png', file, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })



    }
}

module.exports = logic