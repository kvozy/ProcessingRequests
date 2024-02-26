const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
    return
  }
  
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' })
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    res.user = decodedData
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: 'Не авторизован' })
  }
}