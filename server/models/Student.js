const {Schema,model} = require('mongoose')


const studentSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
    },
    grade:{
        type:String,
        required:true
    },
    incidentReports:[
        {
            type: Schema.Types.ObjectId,
            ref: 'IncidentReport',
        }
    ]
})

const Student = model('Student',studentSchema)

module.exports = Student
