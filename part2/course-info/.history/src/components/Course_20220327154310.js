

const Header = ({ course }) => <h1>{course.name}</h1>


const Total = ({ course }) => {
  const total = course.parts.reduce((previous, part) => previous + part.exercises, 0)
  return(
    <p>
      total of {total} exercises
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ course }) => 
  <div>
    {course.parts.map((part) => <Part key={part.id} part={part} />)}
  </div>

const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}