import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
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

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      <Statistics values={[]}/>
    </div>
  )
}

export default App