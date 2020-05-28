import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
  const count = useSelector(selectQuestionCount)

  const [currentName, setCurrentName] = useState(name)

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
          <div className={styles.title}>
            <h2>Hello {name}</h2>
            <button onClick={() => dispatch(changeCurrent('INITIAL'))}>
              Change name
            </button>
          </div>
          <div className={styles.buttons}>
            {count === 0 ? (
              <p>
                <span>
                  You don't have any questions yet, please add some here:{' '}
                </span>
                <Link to="/questions">Questions</Link>
              </p>
            ) : null}

            <button
              disabled={count === 0}
              onClick={() => dispatch(changeCurrent('GAME'))}
            >
              Start the Game
            </button>
          </div>
        </div>
      </div>
    )
  }

  if ('GAME' === current && count > 0) {
    return <Quiz {...props} />
  }

  return <button onClick={() => dispatch(changeCurrent('IDLE'))}>RESET</button>
}

export default Game
