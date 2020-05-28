import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Game from './features/game/Game'
import Questions from './features/questions/Questions'
import { selectQuestionCount } from './features/questions/questionsSlice'

const App = () => {
  const count = useSelector(selectQuestionCount)

  return (
    <Router>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <h1>Quiz app</h1>
            <p>Question count: {count}</p>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to="/">Game</Link>
              </li>
              <li className={styles.item}>
                <Link to="/questions">Questions</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/questions">
            <Questions className={styles.content} />
          </Route>
          <Route path="/">
            <Game className={styles.content} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
