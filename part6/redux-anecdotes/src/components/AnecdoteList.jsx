import { useDispatch, useSelector } from "react-redux"
import { voteAnecdoteAsync } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () =>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdoteList = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    return [...anecdoteList].sort((a,b) => b.votes - a.votes)
  })

  const vote = (anecdote) => {
    console.log('vote',anecdote.id)
    dispatch(voteAnecdoteAsync(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  return (
    <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList