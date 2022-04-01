
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

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedNote => {
    res.json(savedNote)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body


  const person = { 
    name: body.name,
    number: body.number
   }

  Person.findByIdAndUpdate(req.params.id , person, { new: true })
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
  if (err.name === 'TypeError') {
    return res.status(400).send({req:req.params})
  }

  if (err.name === 'CastError') {
    return res.status(400).send({ error:'malformatted id' })
  }
  next(err)
}

app.use(errorHandler)