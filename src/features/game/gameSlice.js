import { createSlice } from '@reduxjs/toolkit'
import { load, persist } from '../../helpers/localstorage'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    current: load('current', 'INITIAL'),
    name: load('name', ''),
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
  },
})

export const { changeCurrent, changeName } = gameSlice.actions

export const selectCurrent = (state) => state.game.current
export const selectName = (state) => state.game.name

export default gameSlice.reducer
