import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionCount } from '../questions/questionsSlice'
import styles from './Game.module.css'
import {
  changeCurrent,
  changeName,
  selectCurrent,
  selectName,
} from './gameSlice'
import Quiz from './Quiz'

const Game = (props) => {
  const dispatch = useDispatch()
  const current = useSelector(selectCurrent)
  const name = useSelector(selectName)

  const [currentName, setCurrentName] = useState(name)
  const count = useSelector(selectQuestionCount)

  if ('INITIAL' === current) {
    return (
      <div {...props}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // no "server" side validation
            dispatch(changeName(currentName))
            dispatch(changeCurrent('IDLE'))
          }}
        >
          <h2 className={styles.title}>Please enter your name</h2>

          <div>
            <input
              required
              type="text"
              value={currentName}
              onChange={(e) => {
                setCurrentName(e.target.value)
              }}
            />
            <button className={styles.button} type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    )
  }

  if ('IDLE' === current) {
    return (
      <div {...props}>
        <div>
          <div>
            <h3>Hello {name}</h3>
            <button onClick={() => dispatch(changeCurrent('INITIAL'))}>
              Change name
            </button>
          </div>
          <p>Question count: {count}</p>
        </div>
      </div>
    )
  }

  return <Quiz />
}

export default Game
