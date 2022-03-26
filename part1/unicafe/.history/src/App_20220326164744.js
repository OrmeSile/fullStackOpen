import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / (good + bad + neutral);
  const positive = good / (good + bad + neutral) * 100
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>
  }
  return (
    <ul>
      <li>good {good}</li>
      <li>neutral {neutral}</li>
      <li>bad {bad}</li>
      <li>all {good + neutral + bad}</li>
      <li>average {(good - bad) / (good + bad + neutral)}</li>
      <li>positive {good / (good + bad + neutral) * 100} %</li>
    </ul>
  );
}

const Button = ({ onClick, name }) => <button onClick={onClick}>{ name }</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good +1)} name = 'good'/>
      <Button onClick={() => setNeutral(neutral + 1)} name='neutral' />
      <Button onClick={() => setBad(bad +1)} name = 'bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={ bad}/>
    </div>
  )
}

export default App