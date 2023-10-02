const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required:true,
        trimed:true


    },
    admin:{
        type:Boolean,
        default:false
    },
    teacher:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']


    },
    password:{
        type:String,
        required:true
    }
    
    
},{
    toJSON:{
        virtuals:true
    },
    id:false
})

userSchema.pre('save',async function(next){
    const salt = 10
    if(this.isNew || this.isModified('password')){
        return this.password = await  bcrypt.hash(this.password,salt)
    }
    next()
    
})

userSchema.methods.isCorrectPassword = async function(password){
    
    return bcrypt.compare(password,this.password)
    
}

userSchema.method.sayhi = async function(){
    console.log('hi')
}


const User = model('User',userSchema)

module.exports = User