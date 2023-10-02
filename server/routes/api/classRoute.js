const router = require('express').Router()
const {User,Student,ClassRoom} = require('../../models')

// get all classes

router.route('/')
.get(async(req,res)=>{
    try{
        const classrooms = await ClassRoom.find({})
        .populate(['teacher','students'])
        if(!classrooms)return res.status(200).json({message:'no classrooms found'})
        res.status(200).json(classrooms)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error'})
    }
})
// create classroom 
.post(async(req,res)=>{
    const {name,grade} = req.body
    try{
        const classroom = await ClassRoom.create({name,grade})
        res.status(200).json(classroom)
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error'})
    }
})

// get class by id

router.route('/:id')
.get(async(req,res)=>{
    try{
        const classroom  =  await ClassRoom.findById({_id:req.params.id})
        .populate(['students','teacher'])
        if(!classroom) return res.status(400).json({message:'class not found'})
        res.status(200).json(classroom)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})
// delete class
.delete(async(req,res)=>{
    try{
        const classroom = await ClassRoom.findByIdAndDelete({_id:req.params.id})
        if(!classroom)return res.json({message:'class not found'})
        res.status(200).json(classroom)

    }catch(err){
        console.log(err)
        res.status(500).json({messae:'server error'})
    }
})

// add teacher to class
router.route('/:class_id/teacher/:user_id/add')
.put(async(req,res)=>{
    try{
        const user = await User.findById({_id:req.params.user_id})
        if(!user)return res.status(400).json({message:"user not found"})

        const classroom = await ClassRoom.findByIdAndUpdate({_id:req.params.class_id},
            {teacher:user._id})
        .populate(['students',"teacher"])
        if(!classroom)return res.status(400).json({message:"class not found"})
        res.status(200).json(classroom)
        

    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})

// add student to class

router.route('/:class_id/student/add')
.put(async(req,res)=>{

    try{

        const student = await Student.create(req.body)
        if(!student)return res.status(400).json({message:"student not found"})

        const classroom = await ClassRoom.findByIdAndUpdate({_id:req.params.class_id},
            {$push:{students:student._id}})
            .populate(['teacher','students'])

        if(!classroom)return res.status(400).json({message:"class not found"})
        res.status(200).json(classroom)
        

    }catch(err){
        console.log(err)
        res.status(500).json({message:'error'})
    }
})

module.exports = router