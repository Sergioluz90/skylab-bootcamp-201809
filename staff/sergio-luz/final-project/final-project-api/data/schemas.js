const { Schema, SchemaTypes:{ObjectId} }=require ('mongoose')

const Postit=new Schema({
    text:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    assigned:{
        type:ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        required:false
    }
})

const User= new Schema({
    name:{
        type:String,
        required:true
    },
    surname: {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    buddies:[{
        type:ObjectId,
        ref:'User'
    }]
})


module.exports={
    User,
    Postit
}