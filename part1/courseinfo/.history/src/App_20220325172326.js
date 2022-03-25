
const Header = (props) => (<h1>{props.course.name}</h1>);

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}
const Content = (props) => {
  const items = props.parts.map((part) => {
    return <Part part ={part} />
  })
  return (
    <div>
      {
    </div>
  )
}

const Footer = (props) => {
  return (<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />

      <Content
        parts={course} 
      />

      <Footer
        parts={course.parts}
      />
    </div>
  )
}

export default App