const errorHandler = (err, req, res, next) => {

  if (err.name === 'CastError') {
    return res.status(400).send({ error:'malformatted id' })
  } else if(err.name === 'ValidationError') {
    return res.status(400).send(err.message)
  }
  next(err)
}

module.exports = { errorHandler }