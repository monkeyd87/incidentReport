const router = require('express').Router()
const {ClassRoom,Student,IncidentReport} = require('../../models')


// get all students
router.route('/')
.get(async(req,res)=>{
    try{
        const student = await Student.find({})
        .populate(['incidentReports'])
        if(!student) return res.status(400).json({message:'no student found'})
        res.status(200).json(student)

    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})

// create student
.post(async(req,res)=>{
    try{
        const student = await Student.create(req.body) 
        res.status(200).json(student)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error'})
    }
})

// get student by id

router.route('/:id')
.get(async(req,res)=>{
    try{
        const student =  await Student.findById({_id:req.params.id}).populate('incidentReports')
        if(!student)return res.status(400).json({message:'student not found'})
        res.status(200).json(student)
    }catch(err){
        console.log(err)
        res.status(err).json({message:'error'})
    }
})
.delete(async(req,res)=>{
    try{
        const student = await Student.findByIdAndDelete({_id:req.params.id})
        if(!student)return res.status(400).json({message:'student not found'})
        res.status(200).json({message:`${student.firstname} ${student.lastname} has been deleted`})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'err'})
    }
})

router.route('/addreport')
.put(async(req,res)=>{
    console.log(req.body)
    const {author,student, location,possibleMotivation,intervention, briefDescription,descriptionOfIncident} = req.body
    const incident = await IncidentReport.create({author,possibleMotivation,intervention,briefDescription,descriptionOfIncident,location})
    const students = await Student.updateMany(
        { _id: { $in: student } }, // Filter by student IDs
        { $addToSet: { incidentReports: incident._id } } // Add the incident ID to the student's incident_reports array
      );
      if(!students)return res.status(400).json({message:'no student found'})
      res.json(incident)
})


router.route("/:student_id/report/:report_id/remove")
.put(async(req,res)=>{
    try{
    const student =  await Student.findByIdAndUpdate({_id:req.params.student_id},{$pull:{incidentReports:req.params.report_id}})
        if(!student)return res.status(404).json({message:"student not found"})
        res.json(student)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})


module.exports = router