import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../features/game/gameSlice'
import questionsReducer from '../features/questions/questionsSlice'

export default configureStore({
  reducer: {
    questions: questionsReducer,
    game: gameReducer,
  },
})
