import { createSlice } from '@reduxjs/toolkit'

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    list: [
      {
        id: 1,
        question: 'Test question',
        answers: [
          {
            id: 1,
            correct: true,
            text: 'Answer 1',
          },
          {
            id: 2,
            correct: false,
            text: 'Answer 2',
          },
          {
            id: 3,
            correct: false,
            text: 'Answer 3',
          },
          {
            id: 4,
            correct: false,
            text: 'Answer 4',
          },
        ],
      },
    ],
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
    },
    remove: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload)
    },
  },
})

export const { add, remove } = questionsSlice.actions

export const selectQuestions = (state) => state.questions.list

export default questionsSlice.reducer
