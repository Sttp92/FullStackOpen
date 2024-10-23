import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleOnClick}>{props.text}</button>
}

const StatisticsLine = (props) => {
  return <p>{props.text} {props.value}{props.symbol}</p>
}

const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <>
        <p>No feedback given...</p>
      </>
    )
  }
  return (
    <>
      <StatisticsLine text="Good" value={props.good}/>
      <StatisticsLine text="Neutral" value={props.neutral}/>
      <StatisticsLine text="Bad" value={props.bad}/>
      <StatisticsLine text="Total" value={props.total}/>
      <StatisticsLine text="Average" value={props.average}/>
      <StatisticsLine text="Positive Percentage" value={props.positivePercentage} symbol="%"/>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total != 0 ? (good - bad)/total : 0
  const positivePercentage = total != 0 ? (good/total)*100 : 0

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback App</h1>
      <Button handleOnClick={handleGoodClick} text="Good"/>
      <Button handleOnClick={handleNeutralClick} text="Neutral"/>
      <Button handleOnClick={handleBadClick} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  )
}

export default App