import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import Game from './features/game/Game'
import Questions from './features/questions/Questions'

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Game</Link>
          </li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/questions">
          <Questions />
        </Route>
        <Route path="/">
          <Game />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default App
