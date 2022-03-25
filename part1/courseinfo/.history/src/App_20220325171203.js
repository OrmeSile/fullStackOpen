
const Header = (props) => (<h1>{props.course}</h1>);

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => {
        return <Part 
      })}
    </div>
  )
}

const Footer = (props) => {
  return (<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />

      <Content
        parts={parts} 
      />

      <Footer
        parts={parts}
      />
    </div>
  )
}

export default App