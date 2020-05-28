import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove, selectQuestions } from './questionsSlice'

const Questions = () => {
  const questions = useSelector(selectQuestions)
  const dispatch = useDispatch()
  const [form, setForm] = useState({})

  const handleChange = useMemo(
    () => (event) => {
      event.persist()

      setForm((form) => ({
        ...form,
        [event.target.name]: event.target.value,
      }))
    },
    []
  )

  return (
    <div>
      <ul>
        {questions.map((item) => (
          <li key={item.id}>
            <p>{item.question}</p>
            <ul>
              {item.answers.map((answer) => (
                <li key={answer.id}>{answer.text}</li>
              ))}
            </ul>
            <button onClick={() => dispatch(remove(item.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(add(form))
        }}
      >
        <input required type="text" name="question" onChange={handleChange} />

        {[1, 2, 3, 4].map((number) => (
          <div key={number}>
            <input
              required
              type="text"
              name={`answer-${number}`}
              onChange={handleChange}
            />
            <input
              required
              type="radio"
              name="correct"
              value={number}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Questions
