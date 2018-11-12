const { Schema }=require ('mongoose')

const User= new Schema({
    name: String,
    surname: String,
    username:String,
    password: String,
    postit: [Postit]
})

const Postit=new Schema({
    text:String,
    status:String
})

module.exports={
    User,
    Postit
}