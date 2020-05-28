import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Questions.module.css'
import { add, remove, selectQuestions } from './questionsSlice'

const Questions = (props) => {
  const questions = useSelector(selectQuestions)
  const dispatch = useDispatch()
  const [form, setForm] = useState({})

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div {...props}>
      <ul className={styles.list}>
        {questions.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.savedHeader}>
              <h3>{item.question}</h3>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Do you really want to delete this question?'
                    )
                  ) {
                    dispatch(remove(item.id))
                  }
                }}
              >
                Delete
              </button>
            </div>

            <ul className={styles.savedAnswers}>
              {item.answers.map((answer) => (
                <li key={answer.id} className={styles.savedAnswer}>
                  <p>
                    <span>{answer.text}</span>
                    {answer.correct ? (
                      <span className={styles.correct} />
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          // no "server" side validation
          dispatch(add(form))
          setForm({})
          console.log(form, form['question'])
        }}
      >
        <div className={styles.questionHeader}>
          <h2>Add a new question</h2>
          <input
            required
            type="text"
            maxLength="300"
            name="question"
            value={form['question'] || ''}
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </div>

        <ul className={styles.answers}>
          {[1, 2, 3, 4].map((number) => (
            <div key={number} className={styles.answer}>
              <p>Answer #{number}</p>
              <input
                required
                type="text"
                maxLength="300"
                name={`answer-${number}`}
                value={form[`answer-${number}`] || ''}
                onChange={handleChange}
              />
              <input
                required
                type="radio"
                name="correct"
                value={number}
                checked={Number(form['correct']) === number}
                onChange={handleChange}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default Questions
