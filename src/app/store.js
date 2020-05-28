import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import gameReducer from '../features/game/gameSlice'
import questionsReducer from '../features/questions/questionsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    questions: questionsReducer,
    game: gameReducer,
  },
})
