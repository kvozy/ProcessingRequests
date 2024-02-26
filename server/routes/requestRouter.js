const Router = require('express')
const router = new Router()
const requestController = require('../controllers/requestController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, requestController.getAll)


module.exports = router