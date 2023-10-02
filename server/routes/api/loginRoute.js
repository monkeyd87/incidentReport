const router = require('express').Router()
const {User} = require('../../models')
const jwt = require('jsonwebtoken')

router.route('/')
.post(async(req,res)=>{
    console.log(req.body)
    const {email,password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(!user)return res.status(404).json({message:'user not found'})

        const {username,admin,teacher,_id} = user
        
        const isCorrectPassword =  await user.isCorrectPassword(password)
        console.log(isCorrectPassword)
        if(!isCorrectPassword) return res.json({message:'incorrect credentials'})
        
        console.log(user)
        
        const token = jwt.sign({payload:{username,admin,teacher,_id}},'super-secret')

        res.json({token:token})

    }catch(err){
        res.json({message:'error'})
        console.log(err)

    }
    
})

module.exports = router