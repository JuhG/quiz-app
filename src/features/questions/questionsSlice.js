import { createSlice } from '@reduxjs/toolkit'
import { loadObject, persistObject } from '../../helpers/localstorage'

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    // in case this is async, we would need another reducer and a loading state
    list: loadObject('questions', []),
  },
  reducers: {
    add: (state, action) => {
      const { question, correct, ...answers } = action.payload
      const id = Date.now()

      const newItem = {
        id,
        question,
        answers: [1, 2, 3, 4].map((number) => {
          return {
            id: `${id}_${number}`,
            text: answers[`answer-${number}`],
            correct: Number(correct) === number,
          }
        }),
      }

      state.list = [...state.list, newItem]

      persistObject('questions', state.list)
    },
    remove: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload)

      persistObject('questions', state.list)
    },
  },
})

export const { add, remove, load } = questionsSlice.actions

export const selectQuestions = (state) => state.questions.list
export const selectQuestionCount = (state) => state.questions.list.length

export default questionsSlice.reducer
