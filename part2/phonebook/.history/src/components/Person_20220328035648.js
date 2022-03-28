const Person = ({ person }) => {
  console.log(person.name, person.number)
  return <p>{person.name} {person.number}</p>
}

export default Person