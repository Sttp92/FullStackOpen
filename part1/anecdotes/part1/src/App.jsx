import { useState } from 'react'

const MostVoted = (props) => {
  
  const mostVotedAnecdote = () => {
    const maxValue = props.votes.reduce((acc,current) => {
      return Math.max(acc,current)
    }, props.votes[0])
    if (maxValue != 0){
      const index = props.votes.indexOf(maxValue)
      return [props.anecdotes[index], maxValue]
    } else {
      return ["None", 0]
    }
  }

  const [anecdote, value] = mostVotedAnecdote()

  return (
    <>
      <p><em>{anecdote}</em></p>
      <p>It has {value} votes</p>
    </>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))

  const handleNext = () => {
    setSelected(Math.floor(Math.random()*8))
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h4>{anecdotes[selected]}</h4>
      <p>This anecdote has {votes[selected]} votes</p>
      <button onClick={handleNext}>Next Anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <h3>Anecdote with most votes</h3>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App