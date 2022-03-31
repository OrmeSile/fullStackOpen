import Person from "./Person"

const Persons = ({ newSearch, persons, handleDelete }) => {
  return (
    persons
      .filter((person) => new RegExp(newSearch, 'gi')
      .test(person.name))
      .map((person) =>
        <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />)
  )
}

export default Persons