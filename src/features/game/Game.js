import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionCount } from '../questions/questionsSlice'
import {
  changeCurrent,
  changeName,
  selectCurrent,
  selectName,
} from './gameSlice'

const Game = () => {
  const dispatch = useDispatch()
  const current = useSelector(selectCurrent)
  const name = useSelector(selectName)

  const [currentName, setCurrentName] = useState(name)
  const count = useSelector(selectQuestionCount)

  if ('INITIAL' === current) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          // no "server" side validation
          dispatch(changeName(currentName))
          dispatch(changeCurrent('IDLE'))
        }}
      >
        <h2>Please enter your name</h2>
        <input
          required
          type="text"
          value={currentName}
          onChange={(e) => {
            setCurrentName(e.target.value)
          }}
        />
        <button type="submit">Enter</button>
      </form>
    )
  }

  return (
    <div>
      <div>
        <h3>Hello {name}</h3>
        <button onClick={() => dispatch(changeCurrent('INITIAL'))}>
          Chnage name
        </button>
      </div>
      <p>Question count: {count}</p>
    </div>
  )
}

export default Game
