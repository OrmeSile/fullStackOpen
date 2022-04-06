const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const morgan = require('morgan')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to mongoDB:',error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  morgan.token('body', (req) => JSON.stringify(req.body))
  app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
}

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app