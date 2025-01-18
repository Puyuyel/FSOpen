const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map(part => 
          <Part key={part.id} part={part} />
        )
      }
    </>
  )
}

const Course = ({ course }) => {
  const calcSum = () => {
    return course.parts.reduce(
      (sum, part) => sum + part.exercises
    , 0)
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={calcSum()} />
    </div>
  )
}

export default Course