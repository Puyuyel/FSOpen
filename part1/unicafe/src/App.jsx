import { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral, total }) => {
  const calcAverage = () => {
    return total !== 0 ? (good - bad) / total : 0
  }

  const calcPositive = () => {
    return (total !== 0 ? good * 100 / total : 0) + '%'
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value ={good} />
        <StatisticLine text='neutral' value ={neutral} />
        <StatisticLine text='bad' value ={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value ={calcAverage()} />
        <StatisticLine text='positive' value ={calcPositive()} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    setGood(newGood)
    setTotal(t => t + 1)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(t => t + 1)
  }

  const handleBadClick = () => {
    const newBad = bad + 1
    setBad(newBad)
    setTotal(t => t + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <section>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </section>
      <h1>statistics</h1>
      { 
        total !== 0 ?
        <Statistics good={good} bad={bad} neutral={neutral} total={total}/> :
        <p>No feedback given yet</p>
      }
    </div>
  )
}

export default App