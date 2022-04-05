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
    request.token = authorization.subString(7)
  }
  next()
}

module.exports = { errorHandler, tokenExtractor }