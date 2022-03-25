
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
        <li>{part.name} {part. }</li>
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
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}   
      />

      <Footer
        exercises1={exercises1} exercises2 = {exercises2} exercises3={exercises3}
      />
    </div>
  )
}

export default App