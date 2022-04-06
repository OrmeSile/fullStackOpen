const jwt = require('jsonwebtoken')
const User = require('../models/User')

const errorHandler = (err, req, res, next) => {

  if (err.name === 'CastError') {
    return res.status(400).send({ error:'malformatted id' })
  } else if(err.name === 'ValidationError') {
    return res.status(400).send(err.message)
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'expired token'
    })
  }
  next(err)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.split(' ')[1]
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) {
    return next()
  }
  const decodedToken = jwt.decode(token, process.env.SECRET)
  if (!decodedToken.id) {
    return next()
  }
  const user = await User.findById(decodedToken.id)
  const processedUser = JSON.parse(JSON.stringify(user))
  request.user = processedUser
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }