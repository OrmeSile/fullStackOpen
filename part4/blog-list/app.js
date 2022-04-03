const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
//const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

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
app.use('/api/blogs', blogsRouter)

module.exports = app