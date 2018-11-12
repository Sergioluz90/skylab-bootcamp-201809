const { Schema }=require ('mongoose')

const Postit=new Schema({
    text:String,
    status:String
})

const User= new Schema({
    name: String,
    surname: String,
    username:String,
    password: String,
    postit: [Postit]
})


module.exports={
    User,
    Postit
}