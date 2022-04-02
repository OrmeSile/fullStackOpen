
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const { response } = require('express')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const info = (
      `<p>Phonebook has info for ${persons.length} people</p>
      ${ new Date() }`
    )
    res.send(info)
  })
})

app.get('/api/persons/:id', (req, res, next) => {

  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (body.number === undefined) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT  || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {

  if (err.name === 'CastError') {
    return res.status(400).send({ error:'malformatted id' })
  } else if(err.name === 'ValidationError') {
    return res.status(400).send(err.message)
  }
  next(err)
}

app.use(errorHandler)