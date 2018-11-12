const mongoose=require('mongoose')

const {Postit, User}=require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Postit: mongoose.model('Postit', Postit)
}