const {Schema, model} = require('mongoose');
const baseFieldsSchema = require('./BaseFields.model');
const UserHooks = require('./Hooks/User.hooks');

const userSchema = new Schema({
    first_name:{
        type:Schema.Types.String,
        required:true,
        trim:true     
    },
    last_name:{
        type:Schema.Types.String,
        required:true,
        trim:true     
    },
    email:{
        type:Schema.Types.String,
        required:true,
        trim:true     
    },
    password:{
        type:Schema.Types.String,
        required:true,
        trim:true     
    },
    phone:{
        type:Schema.Types.String,
        required:true,
        trim:true     
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:"Role"        
    },
    address:{
        type:Schema.Types.String,
        default:null
    },
    gender: {
        type:Schema.Types.String,
        enum:["male","female"],
        default:null
    },
    profile_pic:{
        type:Schema.Types.String,
        default:""
    },
    country_code:{
        type:Schema.Types.String,
        default:""
    },
    devicee_token:{
        type:Schema.Types.String,
        default:""
    },
    ...baseFieldsSchema.obj,    
},{
    collection:"User_Master",
    timestamps:true
})

// Initialice hooks
UserHooks.applyHooks(userSchema)

const Users = model("User",userSchema)

module.exports = Users