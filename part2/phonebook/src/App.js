import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
      }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length -1].id + 1
    }
    if (persons.map((person) => person.name).includes(personObject.name)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ? `)) {
        const dbPerson = persons.find((person) => person.name === newName)
        personService.update(dbPerson.id, { ...dbPerson, number: newNumber })
          .then(response => setPersons(persons.map(person => person.id !== dbPerson.id ? person : response)))
      }
    } else {
      setPersons(persons.concat(personObject))
      personService.create(personObject)
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
    setPersons(persons.filter(p => p.id !== id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
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