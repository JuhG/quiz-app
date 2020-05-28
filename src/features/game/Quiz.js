import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectQuestions } from '../questions/questionsSlice'
import styles from './Quiz.module.css'

export default (props) => {
  const questions = useSelector(selectQuestions)
  const [current, setCurrent] = useState(0)
  const [points, setPoints] = useState(0)

  return (
    <div {...props}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>{`${current + 1} / ${questions.length}`}</p>
          <p>Points: {points}</p>
        </div>

        <h2 className={styles.title}>{questions[current].question}</h2>

        <ul className={styles.list}>
          {questions[current].answers.map((answer) => {
            return (
              <li className={styles.item} key={answer.id}>
                <button className={styles.button}>{answer.text}</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
