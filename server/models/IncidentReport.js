const { Schema, model } = require('mongoose');


const incidentReportSchema = new Schema(
    {
       
        author:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        location:[
            {
                type:String
            }
        ],
        possibleMotivation:[
            {
                type:String
            }
        ],
        intervention:[
            {
                type: String
            }
        ],
        briefDescription:{
            type:String
        },
        descriptionOfIncident:{
            type:String
        }

        

    },
    {
        toJSON:{
            virtuals:true
        },
        id:false
    }
)

const IncidentReport = model('IncidentReport',incidentReportSchema)

module.exports = IncidentReport
