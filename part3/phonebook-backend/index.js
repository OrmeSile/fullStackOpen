
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (req, res) => {
  const info = (
    `<p>Phonebook has info for ${persons.length} people</p>
    ${ new Date() }`
  )
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(note => note.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  }
})

const randomId = () => Math.floor(Math.random() * 1250) 

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

const PORT = process.env.PORT  || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})