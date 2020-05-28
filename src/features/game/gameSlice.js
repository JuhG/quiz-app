import { createSlice } from '@reduxjs/toolkit'
import { load, persist } from '../../helpers/localstorage'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    current: load('current', 'INITIAL'),
    name: load('name', ''),
    score: load('score', 0),
  },
  reducers: {
    changeCurrent: (state, action) => {
      state.current = action.payload

      persist('current', state.current)
    },
    changeName: (state, action) => {
      state.name = action.payload

      persist('name', state.name)
    },
    changeScore: (state, action) => {
      state.score = action.payload

      persist('score', state.score)
    },
  },
})

export const { changeCurrent, changeName, changeScore } = gameSlice.actions

export const selectCurrent = (state) => state.game.current
export const selectName = (state) => state.game.name
export const selectScore = (state) => state.game.score

export default gameSlice.reducer
