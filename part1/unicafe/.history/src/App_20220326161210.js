import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(good + 1)}>good</button>
      <button onClick={() => setGood(good + 1)}>good</button>
      
    </div>
  )
}

export default App