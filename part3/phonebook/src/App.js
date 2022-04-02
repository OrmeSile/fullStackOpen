import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ info }) => {
  
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const successStyle = { ...errorStyle, color: 'green' }
  
  const status = info[0]
  const content = info[1]
  if (status === 0) {
    return null;
  }
  if (status === -1) {
    return (
      <div style={errorStyle} className='error'>
        {content}
      </div>
    )
  }
  if (status === 1) {
    return (
      <div style={successStyle} className="success">
        {content}
      </div>
    )
  }
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [displayMessage, setNewMessage] = useState([0, ''])
  
  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map((person) => person.name).includes(personObject.name)) {

      const popup = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ? `)

      if (popup) {
        const dbPerson = persons.filter(person => person.name === newName)[0]
        personService
          .update(dbPerson.id, { ...dbPerson[0], number: newNumber })
          .then(response => {
            setPersons(persons.map (
                person => person.id === dbPerson.id
                  ? response
                  : person
              )
            )
          }).catch(err => {
            setNewMessage(
              [-1, err.response.data]
            )
            setTimeout(() => {
              setNewMessage(
                [0, '']
              )
              
            }, 3000);
          })
      }
    } else {
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNewMessage(
            [1, `Added ${person.name}`]
          )
          setTimeout(() => {
            setNewMessage([0, ''])
          }, 3000)
        }).catch(err => {
          setNewMessage(  
            [-1, err.response.data]
          )
          setTimeout(() => {
            setNewMessage([0, ''])
          }, 3000)
          })
        }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFieldChange = (event) => {
    setNewSearch(event.target.value)
  }
  const handleDelete = (id) => {
    personService.remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(e => {
      const personName = persons.find(person => person.id === id).name
      setNewMessage(
        [-1, `${personName} was already deleted`]
      )
      setPersons(persons.filter(p => p.id !== id))
      setTimeout(() => {
        setNewMessage([0, ''])
      }, 3000)
    } )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        info={displayMessage}
      />
      <Filter
        newSearch={newSearch}
        handleSearchFieldChange={handleSearchFieldChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newSearch={newSearch}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App