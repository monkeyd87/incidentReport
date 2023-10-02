const { Schema, model } = require('mongoose');

const classrooomSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    grade:{
        type:Number,
        required:true
    },
    students:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
            

        }
    ],
    teacher:{
        type: Schema.Types.ObjectId,
        ref:'User'

    }

})

const ClassRoom = model('ClassRoom',classrooomSchema)

module.exports = ClassRoom