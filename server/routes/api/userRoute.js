const router = require('express').Router()
const {User} = require('../../models')

// get all users
router.route('/')
.get(async(req,res)=>{
    try{
        const Users = await User.find({})
        .select(['-password','-__v'])
        if(!Users)return res.json({message:'no users',data:[]})
        res.status(200).json(Users)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Server error'})
    }
})
// create user
.post(async(req,res)=>{
    const {username,teacher,email,password} = req.body
    try{
        const user =  await User.create({username,teacher,email,password})
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }
})


// get user by id

router.route('/me')
.get(async(req,res)=>{
    console.log(req.user.User,'user data')
    const {_id} = req.user.payload
    try{
        const user =  await User.findById(_id)
        .select('-password')
        if(!user)return res.status(400).json({message:'user not found'})
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})
// delete user
.delete(async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete({_id:req.params.id})
        if(!user)return res.status(400).json({message:'user not found'})
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})

module.exports = router