import Person from "./Person"

const Persons = ({ newSearch, persons }) => {
  return (
    persons
      .filter((person) => new RegExp(newSearch, 'gi')
      .test(person.name))
      .map((person) =>
        <Person
          key={person.name}
          person={person}
        />)
  )
}

export default Persons