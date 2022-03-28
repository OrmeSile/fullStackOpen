const Person = ({ name, number }) => {
  console.log(name, number)
  return <p>{name} {number}</p>
}

export default Person