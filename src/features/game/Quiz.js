import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestions } from '../questions/questionsSlice'
import { changeCurrent, changeScore, selectScore } from './gameSlice'
import styles from './Quiz.module.css'

export default (props) => {
  const dispatch = useDispatch()
  const score = useSelector(selectScore)

  const questions = useSelector(selectQuestions)
  const [step, setStep] = useState(0)
  const [points, setPoints] = useState(0)
  const [selected, setSelected] = useState(null)

  const getColor = (answer, selected) => {
    if (answer.id === selected) {
      if (answer.correct) {
        return 'green'
      } else {
        return 'red'
      }
    }

    if (answer.correct) {
      return 'lightgreen'
    }
  }

  return (
    <div {...props}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>{`${step + 1} / ${questions.length}`}</p>
          <p>Points: {points}</p>
        </div>

        <h2 className={styles.title}>{questions[step].question}</h2>

        <ul className={styles.list}>
          {questions[step].answers.map((answer) => {
            return (
              <li className={styles.item} key={answer.id}>
                <button
                  style={{
                    background:
                      null === selected ? '' : getColor(answer, selected),
                  }}
                  className={styles.button}
                  onClick={() => {
                    if (null !== selected) return
                    setSelected(answer.id)
                    if (answer.correct) {
                      setPoints(points + 1)
                    }
                  }}
                >
                  {answer.text}
                </button>
              </li>
            )
          })}
        </ul>

        {null === selected ? null : (
          <div className={styles.nav}>
            <button
              onClick={() => {
                if (step + 1 === questions.length) {
                  dispatch(changeCurrent('IDLE'))
                  if (points > score) {
                    dispatch(changeScore(points))
                  }

                  setTimeout(() => {
                    alert(`Congrats, your final score is ${points}`)
                  }, 0)
                  return
                }

                setSelected(null)
                setStep(step + 1)
              }}
            >
              {step + 1 === questions.length ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
