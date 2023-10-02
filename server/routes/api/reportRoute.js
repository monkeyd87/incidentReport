const {IncidentReport} = require('../../models')

const router = require('express').Router()

router.route('/')
.get(async(req,res)=>{
    try{
        const reports = await IncidentReport.find({})
        res.status(200).json(reports)
        


    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})

router.route('/:id')
.get(async(req,res)=>{
    try{
        const report =await  IncidentReport.findById(req.params.id)
        if(!report) return res.status(400).json({messae:'report not found'})
        res.status(200).json(report)
    }catch(err){
        res.status(500).json({message:'server error'})
        console.log(err)
    }
})
.delete(async(req,res)=>{
    try{
        const report = await  IncidentReport.findByIdAndDelete(req.params.id)
        if(!report) return res.status(400).json({messae:'report not found'})
        res.status(200).json(report)
    }catch(err){
        res.status(500).json({message:'server error'})
        console.log(err)
    }
})

    


module.exports = router