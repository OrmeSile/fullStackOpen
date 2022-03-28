import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.map((person) => person.name).includes(personObject.name)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input 
        value={newSearch}
        onChange={handleSearchFieldChange}
      /></div>
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        
      <h2>Numbers</h2>
      {persons
        .filter((person) => new RegExp(newSearch, 'gi')
        .test(person.name))
        .map((person) =>
          <p key={person.name}>
            {person.name} {person.number}
          </p>)
      }
    </div>
  )
}

export default App