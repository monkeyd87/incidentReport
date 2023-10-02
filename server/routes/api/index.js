const router = require('express').Router()
const authenticateToken = require('../../auth/index')

router.use('/login',require('./loginRoute'))
router.use('/signup',require('./signupRoute'))
router.use((req,res,next)=>authenticateToken(req,res,next))

router.use('/classroom',require('./classRoute'))
router.use('/user',require('./userRoute'))
router.use('/student',require('./studentRoute'))
router.use('/reports',require('./reportRoute'))






module.exports = router