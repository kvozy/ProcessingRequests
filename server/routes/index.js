const Router = require('express')

const router = new Router()
const userRouter = require('../routes/userRouter')
const requestRouter = require('../routes/requestRouter')


router.use('/user', userRouter)
router.use('/request', requestRouter)

module.exports = router