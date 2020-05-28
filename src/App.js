import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Game from './features/game/Game'
import Questions from './features/questions/Questions'

const App = () => (
  <Router>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Quiz app</h1>
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

export default App
